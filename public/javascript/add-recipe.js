const inputFile = document.getElementById('image-btn');
const uploadImage = document.getElementById('upload-image');
const virtualBtn = document.getElementById('virtual-image-button')
let image_url;
function uploadFile() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        uploadImage.style.display = "block";
        reader.addEventListener('load', function() {
            uploadImage.setAttribute('src', this.result);
            image_url = this.result;
            console.log(image_url);
        })
        reader.readAsDataURL(file)
    } else {
        uploadImage.setAttribute('src', "")
        uploadImage.style.display = 'none'
    }
}

/*debugger;
inputFile.addEventListener('change', uploadFile);*/
if(inputFile) inputFile.addEventListener('change', uploadFile);

virtualBtn.addEventListener('click', function() {
    event.preventDefault();
    /*debugger;*/
    inputFile.click();
})


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
    console.log(image_url);
  
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        ingredients,
        directions,
        image_url
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