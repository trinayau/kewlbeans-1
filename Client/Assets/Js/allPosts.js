
//Helper function to insert one element after another
function insertAfter(newElement, existingElement) {
    existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling);
}

const showPosts = async () => {
    const res = await fetch ('http://localhost:3000/reviews');
    const reviews = await res.json();
    for (let i = 0; i < reviews.length; i++) {
        const reviewIdx = reviews[i];
        const {id, title, description, content, gif, reaction, comments} = reviewIdx;        
        //for each post, we want:
        //new container
        const newDiv = document.createElement("div");
        newDiv.classList.add("post-container");
        newDiv.setAttribute("id", `review${id}`);
        document.getElementById("allposts").appendChild(newDiv)
        //new title
        const newTitle = document.createElement("h2");
        newTitle.textContent = title;
        newDiv.append(newTitle);
        //new description
        const newLocation = document.createElement("h3");
        newLocation.textContent = description;
        newTitle.append(newLocation);
        insertAfter(newLocation, newTitle)
        //new content
        const newContent = document.createElement("p");
        newContent.textContent = content;
        insertAfter(newContent, newLocation);
        //new gif
        // const newGif = document.createElement("h3");
        //GIPHY API KEY INFO
        const gifDiv = document.createElement("div");
        gifDiv.setAttribute("id", `gifDivId${id}`);
        newDiv.append(gifDiv);
        const giphy = document.createElement("img");
        const giphyAPIKEY = "43TNXQTzYml4CNTzdlyxNveqsrh7z3CB";
                let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKEY}&limit=25&offset=0&q=${gif}`;
                fetch(url)
                    .then((r) => r.json())
                    .then((data) => {
                        giphy.src = data.data[0].images.original.url;
                        gifDiv.append(giphy)
                    });
        

        //reaction bar
        const reactionDiv = document.createElement("div");
        reactionDiv.classList.add("reaction-div");
        newDiv.append(reactionDiv);
        
        const thumbs = document.createElement("button");
        thumbs.classList.add("thumbs" , "fa-solid", "fa-thumbs-up")
        reactionDiv.appendChild(thumbs);

        const heart = document.createElement("button");
        heart.classList.add("heart" , "fa-solid", "fa-heart")
        reactionDiv.appendChild(heart);

        const coffee = document.createElement("button");
        coffee.classList.add("coffee" , "fa-solid", "fa-mug-hot")
        reactionDiv.appendChild(coffee);

        //new comments
        const formElement = document.createElement("form");
        reactionDiv.append(formElement);
        // add comment input
        const comment = document.createElement("input");
        comment.setAttribute("type", "text");
        comment.setAttribute("name","comment-input");
        comment.setAttribute("placeholder","comment here");

        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type","submit");
        submitBtn.setAttribute("value","submit");
        formElement.appendChild(comment);
        formElement.appendChild(submitBtn);

    }

}

showPosts();

