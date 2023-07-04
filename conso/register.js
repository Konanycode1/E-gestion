$().ready(function () {
  let api = "http://localhost:3000/api/boutique/";
  $("#signupB").on("submit", (e) => {
    e.preventDefault();
    let data = new FormData();
    let nomBoutique = $("#nomBoutique").val();
    let localisation = $("#localisation").val();
    let email = $("#email").val();
    let numero = $("#numero").val();
    let numeroFixe = $("#numeroFixe").val();
    let ville =$("#ville").val();
    let logo = $("#logo").get(0).files[0];
    let password = $("#password").val();
    let cpassword = $("#cpassword").val();

    data.append("nomBoutique", nomBoutique);
    data.append("localisation", localisation);
    data.append("email", email);
    data.append("numero", numero);
    data.append("numeroFixe", numeroFixe);
    data.append("logo", logo);
    data.append("ville",ville)
    data.append("password", password);
    

    fetch(api, { method: "POST", body: data })
      .then((response) => response.json())
      .then((answere) => {
        console.log(answere);
      })
      .catch((err) => console.log(err));
  });
});
