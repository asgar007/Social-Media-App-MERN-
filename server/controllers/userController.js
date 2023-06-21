const User = require('../models/user');

/* READ */
module.exports.getUser = async function(req, res){
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(404).json({ error: err.message });
    }
}

module.exports.getUserFriends = async function(req, res){
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        //since multiple api calls to database i.e Promise.all()
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        // for frontEND formatted friend 
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
    } catch(err){
        res.status(404).json({ error: err.message });
    }
}

/* UPDATE */
module.exports.addRemoveFriend = async function(req, res){
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter( (id) => id != friendId );
            friend.friends = friend.friends.filter( (id) => id != id );
        } else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        //since multiple api calls to database i.e Promise.all()
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        // for frontEND formatted friend 
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch(err){
        res.status(404).json({ error: err.message });
    }
}