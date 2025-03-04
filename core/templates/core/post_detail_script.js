document.addEventListener('click', function(e) {
    if (!e.target.closest('.post-menu') && !e.target.closest('.comment-menu')) {
        document.querySelectorAll('.post-menu-dropdown, .comment-menu-dropdown').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

function togglePostMenu(postId) {
    const menu = document.getElementById(`postMenu${postId}`);
    document.querySelectorAll('.post-menu-dropdown, .comment-menu-dropdown').forEach(m => {
        if (m !== menu) m.style.display = 'none';
    });
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function toggleCommentMenu(commentId) {
    const menu = document.getElementById(`commentMenu${commentId}`);
    document.querySelectorAll('.post-menu-dropdown, .comment-menu-dropdown').forEach(m => {
        if (m !== menu) m.style.display = 'none';
    });
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function editPost(postId) {
    const contentDiv = document.getElementById(`postContent${postId}`);
    const currentContent = contentDiv.querySelector('p') ? contentDiv.querySelector('p').textContent : contentDiv.childNodes[0].textContent.trim();
    
    const textarea = document.createElement('textarea');
    textarea.value = currentContent;
    textarea.style.width = '100%';
    textarea.style.minHeight = '100px';
    textarea.style.background = '#ffffff20';
    textarea.style.border = 'none';
    textarea.style.padding = '10px';
    textarea.style.borderRadius = '5px';
    textarea.style.color = 'var(--text-color)';
    textarea.style.resize = 'vertical';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.style.background = '#00b74a';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.padding = '8px 15px';
    saveButton.style.borderRadius = '5px';
    saveButton.style.marginTop = '10px';
    saveButton.style.cursor = 'pointer';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.style.background = '#ff4444';
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.padding = '8px 15px';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.marginTop = '10px';
    cancelButton.style.marginLeft = '10px';
    cancelButton.style.cursor = 'pointer';

    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    // Save original content including images
    const originalContent = contentDiv.innerHTML;
    contentDiv.innerHTML = '';
    contentDiv.appendChild(textarea);
    contentDiv.appendChild(buttonContainer);

    saveButton.onclick = function() {
        const newContent = textarea.value;
        fetch(`/post/${postId}/edit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: `content=${encodeURIComponent(newContent)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                contentDiv.innerHTML = data.content;
                document.getElementById(`postMenu${postId}`).style.display = 'none';
            }
        });
    };

    cancelButton.onclick = function() {
        contentDiv.innerHTML = originalContent;
    };

    document.getElementById(`postMenu${postId}`).style.display = 'none';
}

function deletePost(postId) {
    if (confirm('¿Seguro que lo querés borrar?')) {
        fetch(`/post/${postId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        }).then(() => {
            window.location.href = '/home/';
        });
    }
}

function editComment(commentId) {
    const contentDiv = document.getElementById(`commentContent${commentId}`);
    const currentContent = contentDiv.querySelector('p') ? contentDiv.querySelector('p').textContent : contentDiv.childNodes[0].textContent.trim();
    
    const textarea = document.createElement('textarea');
    textarea.value = currentContent;
    textarea.style.width = '100%';
    textarea.style.minHeight = '100px';
    textarea.style.background = '#ffffff20';
    textarea.style.border = 'none';
    textarea.style.padding = '10px';
    textarea.style.borderRadius = '5px';
    textarea.style.color = 'var(--text-color)';
    textarea.style.resize = 'vertical';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar';
    saveButton.style.background = '#00b74a';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.padding = '8px 15px';
    saveButton.style.borderRadius = '5px';
    saveButton.style.marginTop = '10px';
    saveButton.style.cursor = 'pointer';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.style.background = '#ff4444';
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.padding = '8px 15px';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.marginTop = '10px';
    cancelButton.style.marginLeft = '10px';
    cancelButton.style.cursor = 'pointer';

    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    // Save original content including images
    const originalContent = contentDiv.innerHTML;
    contentDiv.innerHTML = '';
    contentDiv.appendChild(textarea);
    contentDiv.appendChild(buttonContainer);

    saveButton.onclick = function() {
        const newContent = textarea.value;
        fetch(`/comment/${commentId}/edit/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: `content=${encodeURIComponent(newContent)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                contentDiv.innerHTML = data.content;
                document.getElementById(`commentMenu${commentId}`).style.display = 'none';
            }
        });
    };

    cancelButton.onclick = function() {
        contentDiv.innerHTML = originalContent;
    };

    document.getElementById(`commentMenu${commentId}`).style.display = 'none';
}

function deleteComment(commentId) {
    if (confirm('¿Seguro que lo querés borrar?')) {
        fetch(`/comment/${commentId}/delete/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        }).then(() => {
            window.location.reload();
        });
    }
}

document.getElementById('comment-image-input').addEventListener('change', function(event) {
    const input = event.target;
    const file = input.files[0];
    const fileNameSpan = document.getElementById('comment-file-name');
    const previewImage = document.getElementById('comment-preview');
    const previewContainer = document.getElementById('comment-preview-container');
    const removeButton = document.getElementById('comment-removeImageButton');
    
    if (file) {
        fileNameSpan.textContent = '📎 ' + file.name;
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
        }
        reader.readAsDataURL(file);
        removeButton.style.display = 'inline-block';
    } else {
        fileNameSpan.textContent = '';
        previewContainer.style.display = 'none';
        previewImage.src = '#';
        removeButton.style.display = 'none';
    }
});

document.getElementById('comment-removeImageButton').addEventListener('click', function() {
    const imageInput = document.getElementById('comment-image-input');
    imageInput.value = '';
    document.getElementById('comment-file-name').textContent = '';
    document.getElementById('comment-preview-container').style.display = 'none';
    document.getElementById('comment-preview').src = '#';
    this.style.display = 'none';
});
        
document.querySelectorAll('.like-comment-btn').forEach(button => {
    button.addEventListener('click', function() {
        const commentId = this.dataset.commentId;
        const likeIcon = this.querySelector('img');
        
        fetch(`/comment/${commentId}/like/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        })
        .then(response => response.json())
        .then(data => {
            const likesCount = this.querySelector('.comment-likes-count');
            likesCount.textContent = data.likes_count;
            this.classList.toggle('liked', data.liked);
            
            // Update the like icon based on the liked state
            if (data.liked) {
                likeIcon.src = "/media/icons&art/likeCF.png";
            } else {
                likeIcon.src = "/media/icons&art/likeSF.png";
            }
        });
    });
});

function toggleUsers(e) {
    e.preventDefault();
    const rightNav = document.querySelector('.right-nav');
    const usersIcon = document.getElementById('users-icon');
    rightNav.classList.toggle('active');

    if (rightNav.classList.contains('active')) {
        usersIcon.src = "/media/icons&art/posterCF.png";
    } else {
        usersIcon.src = "/media/icons&art/posterSF.png";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const likeBtn = document.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const likeIcon = this.querySelector('img');
            
            fetch(`/post/${postId}/like/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                }
            })
            .then(response => response.json())
            .then(data => {
                const likesCount = this.querySelector('.likes-count');
                likesCount.textContent = data.likes_count;
                this.classList.toggle('liked', data.liked);
                
                // Update the like icon based on the liked state
                if (data.liked) {
                    likeIcon.src = "/media/icons&art/likeCF.png";
                } else {
                    likeIcon.src = "/media/icons&art/likeSF.png";
                }
            });
        });
    }
});

// Comment formatting buttons functionality
const commentTextarea = document.querySelector('.comment-input');
const commentBoldButton = document.getElementById('comment-bold-button');
const commentH4Button = document.getElementById('comment-h4-button');

// Track button states
let commentBoldActive = false;
let commentH4Active = false;

// Function to update button appearance
function updateCommentButtonAppearance() {
    commentBoldButton.style.backgroundColor = commentBoldActive ? '#444' : 'transparent';
    commentH4Button.style.backgroundColor = commentH4Active ? '#444' : 'transparent';
}

// Function to wrap selected text with markers or remove them if already present
function wrapCommentSelectedText(startMarker, endMarker, buttonType) {
    const start = commentTextarea.selectionStart;
    const end = commentTextarea.selectionEnd;
    const selectedText = commentTextarea.value.substring(start, end);
    const fullText = commentTextarea.value;
    
    if (buttonType === 'bold') {
        commentBoldActive = !commentBoldActive;
    } else if (buttonType === 'h4') {
        commentH4Active = !commentH4Active;
    }
    
    updateCommentButtonAppearance();
    
    // Check if the selected text already has the markers
    const hasMarkers = 
        (start >= startMarker.length && 
         end <= fullText.length - endMarker.length && 
         fullText.substring(start - startMarker.length, start) === startMarker && 
         fullText.substring(end, end + endMarker.length) === endMarker);
    
    if (hasMarkers) {
        // Remove the markers
        const newText = 
            fullText.substring(0, start - startMarker.length) + 
            selectedText + 
            fullText.substring(end + endMarker.length);
        
        commentTextarea.value = newText;
        commentTextarea.selectionStart = start - startMarker.length;
        commentTextarea.selectionEnd = end - startMarker.length;
    } else if (selectedText) {
        // If text is selected, wrap it with markers
        const newText = 
            fullText.substring(0, start) + 
            startMarker + selectedText + endMarker + 
            fullText.substring(end);
        
        commentTextarea.value = newText;
        commentTextarea.selectionStart = start + startMarker.length;
        commentTextarea.selectionEnd = end + startMarker.length;
    } else {
        // If no text is selected, insert markers at cursor position
        const cursorPos = commentTextarea.selectionStart;
        const newText = 
            fullText.substring(0, cursorPos) + 
            startMarker + endMarker + 
            fullText.substring(cursorPos);
        
        commentTextarea.value = newText;
        // Place cursor between the markers
        commentTextarea.selectionStart = cursorPos + startMarker.length;
        commentTextarea.selectionEnd = cursorPos + startMarker.length;
    }
    
    commentTextarea.focus();
}

// Bold button click handler
commentBoldButton.addEventListener('click', function() {
    wrapCommentSelectedText('**', '**', 'bold');
});

// H4 button click handler
commentH4Button.addEventListener('click', function() {
    wrapCommentSelectedText('++', '++', 'h4');
});

function validateForm(event) {
    const content = document.querySelector('.comment-input').value.trim();
    const image = document.querySelector('#comment-image-input').files[0];
    
    if (!content && !image) {
        alert('Debes agregar un comentario o una imagen');
        return false;
    }
    return true;
}
