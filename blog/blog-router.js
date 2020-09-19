const express = require("express")
const Blog = require('../data/db');

const router= express.Router()


router.post("/api/posts", (req,res)=>{
    if (!req.body.title || !req.body.contents){
        return res.status(400).json({
            message: "Please provide title and contents"
        })
    }

    Blog.insert(req.body)
    .then(post=>{
        console.log("posstt->", post)
        res.status(201).json(post)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    })
})

router.post("/api/posts/:id/comments", (req,res)=>{
    const id= +req.params.id
    const body=req.body

    Blog.findById(id)
    .then(post=>{
        if(post[0]){
            body.post_id=id

            Blog.insertComment(req.body)
            .then((comment)=>{
                res.status(201).json(comment)
                    })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({message: "There was an error while saving the comment to the database"})
            })
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }})
    .catch(err=>{
        res.status(500).json({message: "Error finding post"})
    })

})

// router.post("/api/posts/:id/comments", (req,res)=>{
//     if(!req.body.text){
//         return res.status(400).json({message: "Please provide text for the comment"})
//     }
//     Blog.insertComment(req.body)
//     .then((comment)=>{
//         res.status(201).json(comment)
//             })
//             .catch((err)=>{
//                 console.log(err)
//                 res.status(500).json({message: "There was an error while saving the comment to the database"})
//             })
// })

router.get("/api/posts", (req,res)=>{
    Blog.find(req.query)
    .then(post=>{
        res.status(200).json(post)
    })
})

router.get("/api/posts/:id", (req,res)=>{
    Blog.findById(req.params.id)
    .then(post=>{
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message: "Blog not found"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    })

})

router.get("/api/posts/:id/comments", (req,res)=>{

    Blog.findCommentById(req.params.id)
    .then(comment=>{
        if(comment){
            res.status(200).json(comment)
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message: "The comment information could not be retrieved"})
    })

})

router.delete("/api/posts/:id", (req, res)=>{
    Blog.remove(req.params.id)
    .then(count=>{
        if (count>0){
            res.status(200).json({message: "The post has been removed"})
        }else{
            res.status(404).json({message: "The hub could not be found"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})

router.put("/api/posts/:id", (req,res)=>{
    const changes= req.body
    Blog.update(req.params.id, changes)
    .then(post=>{
        if(post){
            res.status(200).json(post)

        }else{
            res.status(400).json({message:"Please provide title and contents for the post"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message: "The post information could not be modified"})
    })
})




module.exports=router
