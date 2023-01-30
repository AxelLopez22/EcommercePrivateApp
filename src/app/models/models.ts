export interface Category{
    id: number;
    category: string;
}

export interface Categorias{
    idCategoria: number,
    nombre: string
}

export interface SuggestedProducts{
    banerimage: string;
    category: Category;
}

export interface NavigationItem{
    idCategoria: number;
    category: string;
}

export interface Product{
    idProductos: number;
    nombreProducto: string;
    descripcion: string;
    stock: number;
    precio: number;
    imagenUrl: string;
    idCategoria: number;
    nombreCategoria: string;
}

export interface Usuarios{
    nameUser: string;
    phoneNumber: string;
    email: string;
    password: string
}

export interface Login{
    nameUser: string;
    password: string;
}

export interface RespuestaAutenticacion{
    token: string;
    expiracion: Date;
}

export interface Carrito{
    productos:Product[]
}

export interface TotalPago{
    TotalItems: number,
    Total: number
}

export interface MetodoPago{
    id:number,
    nombre:string
}

export interface DetalleCompra{
    idProducto: number,
    cantidad: number,
    precio: number,
    compra: true
}

export interface Compra{
    idMetodoPago: number,
    detalle: DetalleCompra[]
}