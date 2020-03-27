//add event listener

document.getElementById("form").addEventListener("submit", addNewVisitor);

const addNewVisitor = async () => {

    let forms = document.getElementById("forms");
    let body = document.getElementById("body");

    try{

        // submit button
        let visit = await fetch ("/", {
        method:"POST",
        headers:{
            "Content-type":"submit/json"
        },

        // change a json file to a string
        body: JSON.stringify({forms: forms, body:body})
        })
    } catch (err) {
    console.log(err)
    }
}