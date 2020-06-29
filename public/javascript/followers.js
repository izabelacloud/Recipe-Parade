const { response } = require("express");

await function followUser() {
    const recipe_id = parseInt(window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]);

    const personToGetFollowedUserId;

    const response1 = await fetch('/api/recipe/' + post_id);
    if (response1.ok) {
        personToGetFollowedUserId = response1.user_id
    } else {
        alert(response1.statusText)
    }

    const response = await fetch('/api/followers', {
        method: 'POST',
        body: JSON.stringify({
            user_id: personToGetFollowedUserId,
            recipe_id: recipe_id
        })
    })

    if (response.ok) {
        return;
    } else {
        alert(response.statusText)
    }
}