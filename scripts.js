(function() {
    document.getElementById("addTag").addEventListener("click", function() {
        let tagNames = document.getElementById("tagName").value;
        if (tagNames.length > 0) {
            addTag(tagNames);
        }
    });

    function generateID(arr) {
        var tagID = Math.floor(Math.random() * 100).toString();
        var a = arr.includes(tagID);
        if (a) {
            return generateID(arr);
        } else {
            return tagID;
        }
    };

    function addTag(tagNames) {
        let list = document.getElementById("tagList");
        let tagName = tagNames.split(",");
        if (tagName.length == 1) {
            let tagID = generateID(Object.keys(localStorage));
            localStorage.setItem(tagID, tagName);
            list += tagBuilder(tagName, tagID);
        } else {
            for (var i = 0; i < tagName.length; i++) {
                let tagID = generateID(Object.keys(localStorage));
                localStorage.setItem(tagID, tagName[i]);
            }
            list += tagBuilder(tagName, tagID);
        }
    }

    function deleteTag(tagID) {
        localStorage.removeItem(tagID);
        tagListBuilder();
    }

    function tagBuilder(tagName, tagID) {
        return `<div class="tag"><span>${tagName}</span><a class="delete" tagID="${tagID}">&#10005</a></div>`
    }

    function tagListBuilder() {
        let list = document.getElementById("tagList");
        list.innerHTML = "";
        keys = Object.keys(localStorage);
        if (keys.length > 0) {
            for (i of keys) {
                var objectTag = localStorage.getItem(i);
                let item = tagBuilder(objectTag, i);
                list.innerHTML += item;
            }
            let deleteBtns = document.getElementsByClassName("delete");
            for (i of deleteBtns) {
                let tagID = i.getAttribute("tagID");
                i.addEventListener("click", function() {
                    deleteTag(tagID);
                });
            }
        } else {
            list.innerHTML += "No tags available";
        }
    }
    tagListBuilder();
}());