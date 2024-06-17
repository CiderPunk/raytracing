import { Color } from "./color";
import { Ray } from "./ray";
import { Point3, Vec3 } from "./vec3";

export class Main{


  hit_sphere(center:Point3,radius:number, r:Ray):boolean {
    const oc = center.sub(r.origin);
    const a = r.direction.dot(r.direction);
    const b = -2 * r.direction.dot(oc);
    const c = oc.dot(oc) - radius * radius;
    const discriminant = b * b - 4*a*c;
    return (discriminant >= 0);
  }



  ray_color(ray:Ray):Color{
    if (this.hit_sphere(new Vec3(0,0,-1), 0.5, ray)){
      return new Color(1,0,0);
    }
    const unit_direction = ray.direction.unit();
    console.log(unit_direction.toString())
    const a = 0.5*(unit_direction.y + 1.0);
    return new Color(1.0, 1.0, 1.0).scaleInPlace(1-a).addInPlace(new Color(0.5, 0.7, 1.0).scaleInPlace(a)) as Color;
  }


  public constructor(element:string){
    //canvas setup
    const canvas = document.getElementById(element) as HTMLCanvasElement;
    canvas.width = 400;
    canvas.height = 225;

    //context setup
    const ctx = canvas.getContext("2d");
    if (!ctx){
      throw "canvas context not found"
    }
    const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    const data = imageData.data;


    //display size
    const aspect_ratio = 16/9;
    const image_width =  canvas.width;
    const image_height = Math.floor(image_width / aspect_ratio);

    //camera/ viewport
    const focal_length = 1.0;
    const viewport_height = 2.0;
    const viewport_width = viewport_height * image_width / image_height;
    const camera_center = new Vec3(0,0,0);

    // Calculate the vectors across the horizontal and down the vertical viewport edges.
    const viewport_u = new Vec3(viewport_width, 0, 0);
    const viewport_v = new Vec3(0, -viewport_height, 0);

    // Calculate the horizontal and vertical delta vectors from pixel to pixel.
    const pixel_delta_u = viewport_u.div(image_width);
    const pixel_delta_v = viewport_v.div(image_height);

    // Calculate the location of the upper left pixel.
    const viewport_upper_left = camera_center
      .sub(new Vec3(0,0,focal_length))
      .subInPlace(viewport_u.div(2))
      .subInPlace(viewport_v.div(2));

    const pixel00_loc = viewport_upper_left.add(pixel_delta_u.add(pixel_delta_v)).scaleInPlace(0.5);

    for (let j = 0; j < image_height; j++) {
      console.log(`Scanlines remaining: ${image_height - j}`)
      for (let i = 0; i < image_width; i++) {
        const offs = ((j * image_width) + i) * 4

        const pixel_center = pixel00_loc.add(pixel_delta_u.scale(i)).addInPlace(pixel_delta_v.scale(j));
        const ray_direction = pixel_center.sub(camera_center);
        const r = new Ray(camera_center, ray_direction);
        const color = this.ray_color(r);
        color.write(data, offs)
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}