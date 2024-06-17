export class Vec3{

  protected _x: number = 0;
  protected _y:number = 0;
  protected _z:number = 0;


  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
  public get z(): number {
    return this._z;
  }

  public constructor();
  public constructor(x:number, y:number, z:number);
  public constructor(v:Vec3);
  public constructor(x:Vec3|number = 0, y:number = 0, z:number = 0){
    if (typeof x === "number"){
      this._x = x;
      this._y = y;
      this._z = z;
    }
    else{
      this._x = x._x;
      this._y = x._y;
      this._z = x._z;
    }
  }

  public invert():Vec3{
    return new Vec3(-this._x, -this._y,-this._z);
  }

  public addInPlace(t:Vec3):Vec3{
    this._x += t._x;
    this._y += t._y;
    this._z += t._z;
    return this;
  }
  public subInPlace(t:Vec3):Vec3{
    this._x -= t._x;
    this._y -= t._y;
    this._z -= t._z;
    return this;
  }

  public scaleInPlace(s:number):Vec3{
    this._x *= s;
    this._y *= s;
    this._z *= s;
    return this;
  }

  public divInPlace(s:number):Vec3{
    return this.scaleInPlace(1/s);
  }

  public length():number{
    return Math.sqrt(this.lengthSquared());

  }  
  public lengthSquared():number{
    return this._x*this._x + this._y*this._y + this._z*this._z;
  }  

  public add(v:Vec3):Vec3{
    return new Vec3( this._x + v._x, this._y+v._y, this._z+v._z);
  }
  
  public sub(v:Vec3):Vec3{
    return new Vec3( this._x-v._x, this._y-v._y, this._z-v._z);
  }
  public mul(v:Vec3):Vec3{
    return new Vec3(this._x*v._x, this._y*v._y, this._z*v._z);
  }  
  public scale(s:number):Vec3{
    return new Vec3(this._x*s, this._y*s, this._z*s);
  }  
  public div(s:number):Vec3{
    return this.scale(1/s);
  }
  public dot(v:Vec3):number{
    return this._x*v._x + this._y*v._y + this._z*v._z;
  }
  public cross(v:Vec3):Vec3{
    return new Vec3(
      this._y*v._x - this._z*v._y,
      this._z*v._x - this._x*v._z,
      this._x*v._y-this._y*v._z
    );
  }
  public unit(){
    return this.div(this.length())
  }
}

export type point = Vec3;