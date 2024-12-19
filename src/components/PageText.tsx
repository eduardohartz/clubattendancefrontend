function PageText({ text, sidebar }: { text: string, sidebar: boolean }) {
    if (sidebar === false) {
        return (
            <div className="w-full h-screen flex align-middle items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">
                    {text}
                </span>
            </div>
        )
    } else {
        return (
            <div className="lg:usablesize w-full h-[100vh] absolute top-0 right-0 flex items-center justify-center flex-col">
                <span className="text-2xl mt-46 font-['Galano'] select-none">
                    {text}
                </span>
            </div>
        )
    }
};

export default PageText
