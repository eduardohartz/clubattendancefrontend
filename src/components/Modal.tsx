import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit?: () => void
    title?: string
    children: React.ReactNode
    closeText?: string
    submitText?: string
}

function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    children,
    closeText = "Cancel",
    submitText = "Submit",
}: ModalProps) {
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true)
        } else {
            setShouldRender(false)
        }
    }, [isOpen])

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    const handleClickOutside = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }, [handleClose])

    return (
        <AnimatePresence mode="wait" onExitComplete={() => setShouldRender(false)}>
            {(isOpen || shouldRender) && (
                <motion.div
                    className="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClickOutside}
                >
                    <motion.div
                        className="bg-white shadow-lg p-6 rounded-lg w-[500px]"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {title && (
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-2xl">{title}</h2>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size="2x"
                                    className="hover:text-gray-600 transition-colors hover:cursor-pointer"
                                    onClick={handleClose}
                                />
                            </div>
                        )}
                        {children}
                        {onSubmit && (
                            <button
                                className="bg-accent-100 hover:bg-accent-200 mt-4 mr-3 px-4 py-2 rounded-lg text-white transition-colors"
                                onClick={onSubmit}
                            >
                                {submitText}
                            </button>
                        )}
                        <button
                            className="bg-gray-400 hover:bg-gray-500 mt-4 px-4 py-2 rounded-lg text-white transition-colors"
                            onClick={handleClose}
                        >
                            {closeText}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
