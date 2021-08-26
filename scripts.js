(function() {
    document.getElementById("addTag").addEventListener("click", function() {
        let tagNames = document.getElementById("tagName").value;
        if (tagNames.length > 0) {
            addTag(tagNames);
            document.getElementById("tagName").value = "";
        }
    });
    document.getElementById("readonly").addEventListener("click", function() {
        readOnlyMode(this);
    });

    function readOnlyMode(state) {
        if (state.checked) {
            console.log("checked");
            document.getElementById("tagName").disabled = true;
            document.getElementById("addTag").disabled = true;
            let deleteBtns = document.getElementsByClassName("delete");
            for (i of deleteBtns) {
                console.log(i);
                i.setAttribute("hidden", true);
            }
        } else {
            console.log("unchecked");
            document.getElementById("tagName").disabled = false;
            document.getElementById("addTag").disabled = false;
            let deleteBtns = document.getElementsByClassName("delete");
            for (i of deleteBtns) {
                console.log(i);
                i.removeAttribute("hidden");
            }
        }
    }

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
        let tagName = tagNames.split(",");
        if (tagName.length == 1) {
            let tagID = generateID(Object.keys(localStorage));
            localStorage.setItem(tagID, tagName);
            tagListBuilder();
        } else {
            for (var i = 0; i < tagName.length; i++) {
                if (tagName[i].length > 0) {
                    let tagID = generateID(Object.keys(localStorage));
                    localStorage.setItem(tagID, tagName[i]);
                }
            }
            tagListBuilder();
        }
    }

    function deleteTag(tagID) {
        localStorage.removeItem(tagID);
        tagListBuilder();
    }

    function tagBuilder(tagName, tagID) {
        return `<div class="tag"><span>${tagName} </span><span class="delete" tagID="${tagID}">&#10005</span></div>`
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