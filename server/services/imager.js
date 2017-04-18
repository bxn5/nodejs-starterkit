// module dependencies
const Jimp = require('jimp');
const path = require('path');

/**
 * Imager service
 */
class Imager {
  constructor(ImagerConfig){
    this.config = ImagerConfig;
  }

  /**
   * Resize image
   * @param imageName {String} full path to image
   * @param folder {String} path to save
   * @param prefix {String} prefix for new created file
   * @param maxSize {Number} Max size of image (px)
   * @return {Promise}
   */
  resize (
    imageName, 
    folder = this.config.folder, 
    prefix = this.config.prefix,
    maxSize = this.config.max_size
  ){
    if (!fs.existsSync(folder)) 
      fs.mkdirSync(folder);

    return Jimp.read(imageName)
      .then(image => {
        let newsizes = this.getNewSizes(image.bitmap.width, image.bitmap.height, maxSize);
        let filename = path.basename(imageName);

        return image
          .resize(newsizes.height, newsizes.width)
          .write(__root + folder + '/' + prefix + filename);
      });
  }

  /**
   * Calculate right image size
   * @param height {String} image height
   * @param width {String} image width
   * @param maxSize {String} image max size
   * @return object {{height: *, width: *}}
   */
  getNewSizes(height, width, maxSize) {
    if (height > width && height > maxSize){
      width = Jimp.AUTO;
      height = maxSize;
    }

    if (width > height && width > this.config.max_size){
      height = Jimp.AUTO;
      width = maxSize;
    }

    return {width, height};
  }
}

module.exports = new Imager(config.environment.resizer);