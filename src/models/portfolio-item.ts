import { Schema, model, Document } from 'mongoose';

export interface IPortfolioItem extends Document {
    ticker: string;
    description?: string;
    amount?: number;
    price?: number;
    createdOn?: Date;
}

export const schemaPortfolioItem = new Schema({
    ticker: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    price: {
        type: Number,
    },
    createdOn: {
        type: Date,
        required: true,
    }
});

export const PortfolioItem = model<IPortfolioItem>('PortfolioItem', schemaPortfolioItem);
