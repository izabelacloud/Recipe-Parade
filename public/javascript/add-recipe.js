// async function tagFormHandler(event) {
//   event.preventDefault();

//   const tag_name = document.querySelector('input[name="tag-body"]').value.trim();

//   const recipe_id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
//   ];

//   // if there is a comment -- preventing from users submitting empty comments 
//   if (tag_name) {
//       const response = await fetch('/api/tags', {
//         method: 'POST',
//         body: JSON.stringify({
//           recipe_id,
//           tag_name
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
    
//       if (response.ok) {
//         document.location.reload();
        
//       } else {
//         alert(response.statusText);
//         document.querySelector('#tag-form').style.display = "block";
//       }
//     }
// }



async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value.trim();
    const ingredients = document.querySelector('input[name="ingredients"]').value.trim();
    const directions = document.querySelector('input[name="directions"]').value.trim();


    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    console.log(title);
    console.log(ingredients);
    console.log(directions);
    console.log(id);
  
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        ingredients,
        directions
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {

      document.location.replace('/dashboard');
      // document.location.reload();

    } else {
      alert(response.statusText);
    }





  };
  
document.querySelector('#new-recipe-form').addEventListener('submit', newFormHandler);
