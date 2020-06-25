import { Schema, model, Types, Document } from 'mongoose';
import {IPortfolioItem} from "./portfolio-item";

interface IUser extends Document {
    userId: string;
    portfolioItems: IPortfolioItem["_id"][];
}

export const schemaUser = new Schema({
    userId: {
        type: String,
        required: true,
    },
    portfolioItems: [{
        type: Schema.Types.ObjectId,
        ref: "PortfolioItem",
    }]
});

export const User =  model<IUser>('User', schemaUser);
