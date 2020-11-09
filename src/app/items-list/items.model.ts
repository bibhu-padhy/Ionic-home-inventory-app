export interface ItemsDataModel {
    ItemId: string
    ItemName: string;
    ItemQuantity: string;
    ItemPrice: number;
    CreatedAt: Date;
    IsCompleted: boolean;
    UpdatedAt: Date;
    UserId: string;
    ItemType: 'LIQUID' | 'SOILD' | 'POWDER';
}