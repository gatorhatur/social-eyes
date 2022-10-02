const { User } = require('../models');

module.exports = {
    // /api/users
    getAllUsers(req,res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .then(users => res.json(users))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        
    },
    getUser({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate('thoughts')
            .populate('friends')
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(userData);
            })
            .catch(err => res.json(err))
    },
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    updateUser({ params, body }, res) {
        //if a friend was altered
        User.findByIdAndUpdate({ _id: params.userId }, { $set: body }, { new: true, runValidators: true })
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json(userData);
            })
            .catch(err => res.json(err))
    },
    deleteUser({ params }, res) {
        //post delete will need to remove from other friends list
        //will need to cascade thoughts out
    },
    // /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'Failed to Add Friend: No user foudn with this id!' })
                    : res.json(userData);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => {
                !userData
                    ? res.status(404).json({ message: 'Failed to Add Friend: No user foudn with this id!' })
                    : res.json(userData);
            })
            .catch(err => res.json(err));
    }
}