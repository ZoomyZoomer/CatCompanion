const Inventory = require('../models/Inventory.js');

const fetchItem = async (req, res) => {

    const { uid, item_id, item_name } = req.query;

    try {

        let inventory = await Inventory.findOne({ uid });

        if (!inventory) {
            inventory = await Inventory.create({
                uid,
                items: []
            })
        }

        const rel_item = inventory.items.find((item) => item.item_id == item_id);

        if (!rel_item){
            inventory.items.push({item_id, item_name, date_discovered: new Date()});
            await inventory.save();
            
            return res.status(200).json(0);
        }

        return res.status(200).json(rel_item.quantity);

    } catch(e){
        return res.status(500).json({message: 'Error retrieving item'});
    }

}

const useItem = async (req, res) => {

    const { uid, item_id } = req.body;

    try {

        let inventory = await Inventory.findOne({ uid });

        if (!inventory){
            return res.status(500).json({message: 'Error retrieving inventory'});
        }

        const rel_item = inventory.items.find((item) => item.item_id == item_id);

        if (!rel_item){
            return res.status(500).json({message: 'Error retrieving item to use'});
        }

        rel_item.quantity -= 1;
        await inventory.save();

        return res.status(200).json({message: 'Item successfully used'});

    } catch(e){
        return res.status(500).json({message: 'Error using item'});
    }

}

module.exports = {
    fetchItem,
    useItem
}