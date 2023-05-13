
  const Audio =  require("../Model/AudioModel")


  exports.saveAudioUrl = async (req, res) => {
    try {
      const { url } = req.body;
      const audio = new Audio({ url });
      await audio.save();
      res.status(200).json({ message: 'Audio URL saved successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving audio URL' });
    }
  };