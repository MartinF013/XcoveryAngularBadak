export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

export interface DocumentInfoTable {
    id?: number;
    status?: string;
    documentName?: string;
    recievedDate?: string;
    modifiedDate?: string;
    modifiedBy?: string;
}
