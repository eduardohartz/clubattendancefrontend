function PageText({ text, sidebar }: { text: string, sidebar: boolean }) {
    if (sidebar === false) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center align-middle">
                <span className="mt-46 select-none font-['Galano'] text-2xl">
                    {text}
                </span>
            </div>
        )
    } else {
        return (
            <div className="lg:usablesize absolute right-0 top-0 flex h-screen w-full flex-col items-center justify-center">
                <span className="mt-46 select-none font-['Galano'] text-2xl">
                    {text}
                </span>
            </div>
        )
    }
};

export default PageText
