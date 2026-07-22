"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    FileText,
    Clock3,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";

const menus = [

{
title:"Dashboard",
icon:LayoutDashboard,
href:"/dashboard"
},

{
title:"Employees",
icon:Users,
href:"/employees"
},

{
title:"Applications",
icon:FileText,
href:"/application"
},

{
title:"Pending",
icon:Clock3,
href:"/pending"
},

{
title:"Reports",
icon:BarChart3,
href:"/reports"
},

{
title:"Settings",
icon:Settings,
href:"/settings"
}

];

export default function Sidebar(){

const pathname=usePathname();

return(

<aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-xl">
<div className="h-20 flex items-center justify-center border-b border-slate-200 ">

    <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow">

            <span className="text-white font-bold text-xl">
                GO
            </span>

        </div>

        <div>

            <h1 className="text-blue-600 text-2xl font-bold">
                SECURE
            </h1>

            

        </div>

    </div>

</div>

<nav className="flex-1 p-5 space-y-2">

{
menus.map((item)=>{

const Icon=item.icon;

return(

<Link
key={item.title}
href={item.href}
className={`flex items-center gap-4 p-3 rounded-xl transition

${pathname===item.href
?"bg-blue-600 text-white"
:"text-slate-700 hover:bg-slate-100"}

`}
>

<Icon size={20}/>

{item.title}

</Link>

)

})

}

</nav>

<div className="p-5 border-t border-slate-200 shadow-xl">

<button className="flex items-center gap-3 text-red-500">

<LogOut/>

Logout

</button>

</div>

</aside>

)

}