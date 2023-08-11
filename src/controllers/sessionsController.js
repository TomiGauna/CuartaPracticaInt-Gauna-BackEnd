export const register = (req, res) => {
    res.status(200).send({ status: "success", message: "User registered" });
  };
  
  export const failRegister = (req, res) => {
    res.status(400).send({ status: "error", error: "Registry failed" });
  };
  
  export const login = (req, res) => {
    res
      .cookie("loginCookie", req.user, { httpOnly: true })
      .status(200)
      .send("Cookie seteada");
  };
  
  export const failLogin = (req, res) => {
    console.log(req.session.user);
    res.status(400).send({ status: "error", error: "Login fail" });
  };
  
  export const currentUser = (req, res) => {
    if (req.user) {
      res.status(200).send(req.user.user);
    } else {
      res.status(404).send("No se pudo obtener el usuario actual");
    }
  };
  
  export const githubCallback = (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  };
  
  export const logout = (req, res) => {
    res.clearCookie("loginCookie");
    res.redirect("/login");
  };