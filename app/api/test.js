console.log("hello world")
export default (req, res) => {
    const data = {
      message: "podcast stuff",
      timestamp: new Date().toISOString(),
    };
  
    res.status(200).json(data);
  };