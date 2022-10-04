const {User, Thought} = require('../models');

module.exports = {
    // /api/thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then(thoughtData => res.json({ message:'success',thoughtData }))
            .catch(err => res.status(500).json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findById(params.thoughtId)
            .then(thoughtData =>
                !thoughtData
                    ? res.status(404).json({ message: "Invalid thought id!" })
                    : res.json({ message:'success',thoughtData })
            )
            .catch(err => res.status(500).json(err));
        
    },
    async createThought({ body }, res) {

        const user = await User.findById(body.userId)

        if (!user) {
            res.status(404).json({ message: 'Invalid user id' });
            return;
        }

        const thought = await Thought.create(body)
        
        if (!thought) {
            res.status(500).json({ message: 'Something went wrong' })
            return
        }
        
        user.updateOne({ $push: { thoughts: thought._id } })
            .then(userData => res.json({ message:'success',userData }))
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong' })
            });
        
    },
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $set: body },
            { new: true }
        )
            .then(thoughtData =>
                !thoughtData
                    ? res.status(404).json({ message: 'Invalid thought id' })
                    : res.json({ message:'success',thoughtData })
            )
    },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete(params.thoughtId)
            .then(thoughtData => {
                console.log(thoughtData);
                if (!thoughtData) {
                    res.status(404).json({ message: 'Invalid thought id' })
                    return 
                }
                return { stop:false, thoughtData };
            }
            )
            .then(({stop,thoughtData}) => {
                if (stop) {
                    return
                }
                return User.findOneAndUpdate(
                    { thoughts: thoughtData._id },
                    { $pull: { comments: thoughtData._id } },
                    { new: true }
                )
                    .then(userData => 
                        !userData
                            ? res.json({ message: 'Thought deleted but not associated to user' })
                        : res.json({message: 'Thought successfully deleted'}))
                    .catch(err => err);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
        
    },
    // /api/thoughts/:thoughtId/reactions
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $push: { reactions: body } },
            { new: true }
        )
            .then(thoughtData =>
                !thoughtData
                    ? res.status(404).json({ message: 'Invalid thought id' })
                    : res.json({ message:'success',thoughtData })
            ).catch(err => res.status(500).json(err));
    },
        // /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData =>
                !thoughtData
                    ? res.status(404).json({ message: 'Invalid thought id' })
                    : res.json({ message:'success',thoughtData })
            ).catch(err => res.status(500).json(err));
    }
}