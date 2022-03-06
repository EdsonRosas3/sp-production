import path from "path";
export const sendFileLg = (req, res) => {
  try {
    const dir = path.join(
      __dirname,
      `../storage/home/1500X700/${req.params.filename}`
    );
    res.sendFile(dir);
  } catch (error) {}
};

export const sendFileMd = (req, res) => {
    try {
      const dir = path.join(
        __dirname,
        `../storage/home/940X600/${req.params.filename}`
      );
      res.sendFile(dir);
    } catch (error) {}
};

export const sendFileSm = (req, res) => {
    try {
      const dir = path.join(
        __dirname,
        `../storage/home/400X600/${req.params.filename}`
      );
      res.sendFile(dir);
    } catch (error) {}
};

export const sendImgeLogin = (req, res) =>{
  try {
    const dir = path.join(
      __dirname,
      `../storage/home/login/login.jpg`
    )
    res.sendFile(dir);
  } catch (error) {
    
  }
}
  
