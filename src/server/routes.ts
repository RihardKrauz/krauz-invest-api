import { Router } from 'express';
import { User } from '../models/user';
import { PortfolioItem } from '../models/portfolio-item';

const userRoutes = Router();

userRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ userId: id });
    if (!user) {
        await new User({
            userId: id,
            portfolioItems: [],
        }).save();
        res.sendStatus(201);
    } else {
        res.send({ isOk: true, data: user });
    }

});

userRoutes.get('/:id/portfolio/addItem', async (req, res) => {
    const { id } = req.params;
    const {
        ticker,
        description,
        amount,
        price,
    } = req.query;

    const user = await User.findOne({ userId: id });
    if (!user) {
        res.send({ isOk: false, message: `User ${id} not found` });
    } else {
        const newItemModel = new PortfolioItem({
            ticker,
            description,
            amount,
            price,
            createdOn: new Date(),
        });

        const validationError = newItemModel.validateSync();
        if (validationError && validationError.errors) {
            const errorMessages = Object.keys(validationError.errors).map(err => `${validationError.errors[err].message}`);
            res.send({ isOk: false, message: errorMessages.join(', ') });
            return;
        }

        const newItem = await newItemModel.save();

        user.portfolioItems = [...user.portfolioItems, newItem._id];
        await user.save();

        res.send({ isOk: true, message: 'Item has been added to user' });
    }
});

userRoutes.get('/:id/portfolio', async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ userId: id }).populate('portfolioItems');
    if (!user) {
        res.send({ isOk: false, message: `User ${id} not found` });
    } else {
        res.send(user);
    }
});


export {
    userRoutes
}
