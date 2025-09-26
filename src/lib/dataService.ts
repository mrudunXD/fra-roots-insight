// Local storage-based data service for WebGIS Atlas
import { FRAClaim, Village, GeographicalFeature, mockClaims, mockVillages, mockFeatures } from './mockData';

export interface FiltersState {
  state: string;
  district: string;
  claimType: string;
  status: string;
}

export class DataService {
  private static STORAGE_KEYS = {
    CLAIMS: 'webgis_claims',
    VILLAGES: 'webgis_villages',
    FEATURES: 'webgis_features',
    USER_SELECTIONS: 'webgis_user_selections'
  };

  // Initialize data in localStorage if not present
  static initializeData(): void {
    if (!localStorage.getItem(this.STORAGE_KEYS.CLAIMS)) {
      localStorage.setItem(this.STORAGE_KEYS.CLAIMS, JSON.stringify(mockClaims));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.VILLAGES)) {
      localStorage.setItem(this.STORAGE_KEYS.VILLAGES, JSON.stringify(mockVillages));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.FEATURES)) {
      localStorage.setItem(this.STORAGE_KEYS.FEATURES, JSON.stringify(mockFeatures));
    }
  }

  // FRA Claims operations
  static getClaims(): FRAClaim[] {
    const claims = localStorage.getItem(this.STORAGE_KEYS.CLAIMS);
    return claims ? JSON.parse(claims) : mockClaims;
  }

  static getFilteredClaims(filters: FiltersState): FRAClaim[] {
    const claims = this.getClaims();
    return claims.filter(claim => {
      const stateMatch = filters.state === 'all' || claim.state.toLowerCase().replace(' ', '_') === filters.state;
      const districtMatch = filters.district === 'all' || claim.district.toLowerCase() === filters.district;
      const typeMatch = filters.claimType === 'all' || claim.claimType === filters.claimType;
      const statusMatch = filters.status === 'all' || claim.status === filters.status;
      
      return stateMatch && districtMatch && typeMatch && statusMatch;
    });
  }

  static addClaim(claim: Omit<FRAClaim, 'id' | 'submittedDate' | 'lastUpdated'>): FRAClaim {
    const claims = this.getClaims();
    const newClaim: FRAClaim = {
      ...claim,
      id: `claim_${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    claims.push(newClaim);
    localStorage.setItem(this.STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    return newClaim;
  }

  static updateClaim(id: string, updates: Partial<FRAClaim>): FRAClaim | null {
    const claims = this.getClaims();
    const index = claims.findIndex(claim => claim.id === id);
    
    if (index === -1) return null;
    
    claims[index] = {
      ...claims[index],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    localStorage.setItem(this.STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    return claims[index];
  }

  static deleteClaim(id: string): boolean {
    const claims = this.getClaims();
    const filteredClaims = claims.filter(claim => claim.id !== id);
    
    if (filteredClaims.length === claims.length) return false;
    
    localStorage.setItem(this.STORAGE_KEYS.CLAIMS, JSON.stringify(filteredClaims));
    return true;
  }

  // Villages operations
  static getVillages(): Village[] {
    const villages = localStorage.getItem(this.STORAGE_KEYS.VILLAGES);
    return villages ? JSON.parse(villages) : mockVillages;
  }

  static getVillagesByState(state: string): Village[] {
    const villages = this.getVillages();
    if (state === 'all') return villages;
    return villages.filter(village => village.state.toLowerCase().replace(' ', '_') === state);
  }

  // Geographical features operations
  static getFeatures(): GeographicalFeature[] {
    const features = localStorage.getItem(this.STORAGE_KEYS.FEATURES);
    return features ? JSON.parse(features) : mockFeatures;
  }

  static getFeaturesByType(type: string): GeographicalFeature[] {
    const features = this.getFeatures();
    return features.filter(feature => feature.type === type);
  }

  // User selections and preferences
  static saveUserSelection(coordinates: [number, number], metadata?: any): void {
    const selections = this.getUserSelections();
    const newSelection = {
      id: `selection_${Date.now()}`,
      coordinates,
      timestamp: new Date().toISOString(),
      metadata
    };
    
    selections.push(newSelection);
    // Keep only last 50 selections
    if (selections.length > 50) {
      selections.splice(0, selections.length - 50);
    }
    
    localStorage.setItem(this.STORAGE_KEYS.USER_SELECTIONS, JSON.stringify(selections));
  }

  static getUserSelections(): any[] {
    const selections = localStorage.getItem(this.STORAGE_KEYS.USER_SELECTIONS);
    return selections ? JSON.parse(selections) : [];
  }

  static clearUserSelections(): void {
    localStorage.removeItem(this.STORAGE_KEYS.USER_SELECTIONS);
  }

  // Statistics and analytics
  static getClaimStatistics(): any {
    const claims = this.getClaims();
    
    const stats = {
      total: claims.length,
      byStatus: {
        pending: claims.filter(c => c.status === 'pending').length,
        approved: claims.filter(c => c.status === 'approved').length,
        rejected: claims.filter(c => c.status === 'rejected').length,
        under_review: claims.filter(c => c.status === 'under_review').length
      },
      byType: {
        IFR: claims.filter(c => c.claimType === 'IFR').length,
        CFR: claims.filter(c => c.claimType === 'CFR').length,
        CR: claims.filter(c => c.claimType === 'CR').length
      },
      byState: {} as Record<string, number>,
      totalArea: claims.reduce((sum, claim) => sum + claim.area, 0),
      avgArea: claims.length > 0 ? claims.reduce((sum, claim) => sum + claim.area, 0) / claims.length : 0
    };

    // Calculate by state
    claims.forEach(claim => {
      const state = claim.state;
      stats.byState[state] = (stats.byState[state] || 0) + 1;
    });

    return stats;
  }

  // Search functionality
  static searchClaims(query: string): FRAClaim[] {
    const claims = this.getClaims();
    const lowerQuery = query.toLowerCase();
    
    return claims.filter(claim => 
      claim.name.toLowerCase().includes(lowerQuery) ||
      claim.description?.toLowerCase().includes(lowerQuery) ||
      claim.state.toLowerCase().includes(lowerQuery) ||
      claim.district.toLowerCase().includes(lowerQuery)
    );
  }

  // Export/Import functionality
  static exportData(): string {
    const data = {
      claims: this.getClaims(),
      villages: this.getVillages(),
      features: this.getFeatures(),
      selections: this.getUserSelections(),
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.claims) {
        localStorage.setItem(this.STORAGE_KEYS.CLAIMS, JSON.stringify(data.claims));
      }
      if (data.villages) {
        localStorage.setItem(this.STORAGE_KEYS.VILLAGES, JSON.stringify(data.villages));
      }
      if (data.features) {
        localStorage.setItem(this.STORAGE_KEYS.FEATURES, JSON.stringify(data.features));
      }
      if (data.selections) {
        localStorage.setItem(this.STORAGE_KEYS.USER_SELECTIONS, JSON.stringify(data.selections));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Clear all data
  static clearAllData(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

// Initialize data on service load
DataService.initializeData();
