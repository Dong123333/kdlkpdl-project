import {Icon} from "@iconify/react";
import {dividercolor} from "plotly.js/src/plots/cartesian/layout_attributes.js";
import Chart from "../Component/Chart.jsx";

function HomePage() {
    return (
        <>
            <div className="h-[64px] w-full fixed top-0 left-0 right-0">
                <div className="flex items-center justify-between h-full p-2">
                    <div className="flex items-center pr-[30px]">
                        <div className="p-3 mx-1 text-black">
                            <Icon className="text-[24px]" icon="material-symbols:menu"/>
                        </div>

                        <h1 className="text-[22px] text-[#5f6368]">Tài chính</h1>
                    </div>
                    <div>
                        <div className="w-[740px] h-[48px] bg-[#f1f3f4] flex items-center rounded-[6px]">
                            <div className="px-[5px] cursor-pointer">
                                <div className="p-2 m-[3px]">
                                    <Icon className="text-[17px]" icon="tdesign:search"/>
                                </div>
                            </div>
                            <input className="flex-1 bg-transparent border-none outline-none" type="text"
                                   placeholder="Tim ty gia hoi doai"/>
                        </div>
                    </div>
                    <div className=" pl-[30px]">
                        <div className="flex items-center">
                            <div className="h-[48px] w-[48px] flex items-center justify-center">
                                <Icon className="text-[24px]" icon="icon-park-outline:application-menu"/>
                            </div>
                            <div className="h-[48px] w-[48px] flex items-center justify-center">
                                <img className="h-[32px] rounded-[100%]" src="https://placehold.co/400x400" alt=""/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[96px] mt-[64px] bg-[#f8f9fa]">
                <div className="mx-[200px]">
                    <div className="px-[48px] pt-[34px] pb-[12px] flex items-center justify-center">
                        <div className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer">
                            <div className="p-[6px] flex items-center">
                                <div className="mr-2">
                                    <p className="text-[#202124] text-[12px] font-bold">Nikkei 255</p>
                                    <p className="text-[#3c4043] text-[12px] font-medium">38.811,75</p>
                                </div>
                                <div>
                                    <p className="text-[#137333] text-[12px] font-bold">+0,70%</p>
                                    <p className="text-[#137333] text-[12px] font-medium">+269,79</p>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer">
                            <div className="p-[6px] flex items-center">
                                <div className="mr-2">
                                    <p className="text-[#202124] text-[12px] font-bold">Nikkei 255</p>
                                    <p className="text-[#3c4043] text-[12px] font-medium">38.811,75</p>
                                </div>
                                <div>
                                    <p className="text-[#137333] text-[12px] font-bold">+0,70%</p>
                                    <p className="text-[#137333] text-[12px] font-medium">+269,79</p>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer">
                            <div className="p-[6px] flex items-center">
                                <div className="mr-2">
                                    <p className="text-[#202124] text-[12px] font-bold">Nikkei 255</p>
                                    <p className="text-[#3c4043] text-[12px] font-medium">38.811,75</p>
                                </div>
                                <div>
                                    <p className="text-[#137333] text-[12px] font-bold">+0,70%</p>
                                    <p className="text-[#137333] text-[12px] font-medium">+269,79</p>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer">
                            <div className="p-[6px] flex items-center">
                                <div className="mr-2">
                                    <p className="text-[#202124] text-[12px] font-bold">Nikkei 255</p>
                                    <p className="text-[#3c4043] text-[12px] font-medium">38.811,75</p>
                                </div>
                                <div>
                                    <p className="text-[#137333] text-[12px] font-bold">+0,70%</p>
                                    <p className="text-[#137333] text-[12px] font-medium">+269,79</p>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer">
                            <div className="p-[6px] flex items-center">
                                <div className="mr-2">
                                    <p className="text-[#202124] text-[12px] font-bold">Nikkei 255</p>
                                    <p className="text-[#3c4043] text-[12px] font-medium">38.811,75</p>
                                </div>
                                <div>
                                    <p className="text-[#137333] text-[12px] font-bold">+0,70%</p>
                                    <p className="text-[#137333] text-[12px] font-medium">+269,79</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[200px]">
                <div className="px-[48px] py-[24px]">
                    <h2 className="text-[24px] font-normal border-b-[1px] border-solid border-[#e8eaed] pb-2">Đô la Mỹ sang Yên Nhật</h2>
                    <div>
                        <div className="flex items-center ">
                            <p className="text-[36px] font-medium mr-4">156,4749</p>
                            <div className="px-2 bg-[#fce8e6] min-w-[40px] rounded-[8px] h-[32px] flex items-center justify-center mr-2">
                                <div className="flex items-center text-[16px] text-[#a50e0e]">
                                    <Icon icon="ri:arrow-down-line"/>
                                    <p className="font-medium">0,019%</p>
                                </div>
                            </div>
                            <div className="flex items-center text-[#a50e0e] text-[16px] font-medium">
                                <p>-0,037</p>
                                <p className="pl-1">Hom nay</p>
                            </div>

                        </div>
                        <Chart/>

                    </div>

                </div>

            </div>
        </>


    )
}

export default HomePage;