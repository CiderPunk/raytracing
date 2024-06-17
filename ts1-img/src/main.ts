export class Main{
  public constructor(element:string){
    const canvas = document.getElementById(element) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx){
      throw "canvas context not found"
    }

    const image_width =  canvas.width;
    const image_height = canvas.height;
        
    const imageData = ctx.getImageData(0,0,image_width, image_height);
    const data = imageData.data;

    for (let j = 0; j < image_height; j++) {
      for (let i = 0; i < image_width; i++) {
        const offs = ((j * image_width) + i) * 4
        data[offs ] = Math.floor((i / image_width) * 255)
        data[offs + 1] = Math.floor((j / image_height) * 255)
        data[offs + 2] = 0
        data[offs + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}