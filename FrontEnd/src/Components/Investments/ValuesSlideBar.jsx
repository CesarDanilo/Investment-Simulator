const ValuesSlideBar = () => {
    return (
        <div class="flex flex-col items-center space-y-2">
            <h3 class="text-[#B6B6B6]">Eu tenho R$00,00</h3>
            <input
                type="range"
                class="w-1/5 h-1 bg-[#B6B6B6] rounded-full appearance-none outline-none accent-[#B6B6B6] 
               [&::-webkit-slider-thumb]:appearance-none 
               [&::-webkit-slider-thumb]:w-4 
               [&::-webkit-slider-thumb]:h-4 
               [&::-webkit-slider-thumb]:rounded-full 
               [&::-webkit-slider-thumb]:bg-amber-600"
            />
        </div>
    )
}

export default ValuesSlideBar;