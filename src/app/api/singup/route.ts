import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password, role } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and Password required" }), {
        status: 400,
        headers: { "Content-Type": "application/json"},});
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {      
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json"},});
    }
    const newUser = new User({ email, password, role });
    await newUser.save();
    return Response.json({
      message: 'Usuario creado',
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    }, { status: 201 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });}
  
}