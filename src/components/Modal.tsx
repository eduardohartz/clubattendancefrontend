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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleClickOutside}
                >
                    <motion.div
                        className="w-[500px] rounded-lg bg-white p-6 shadow-lg"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {title && (
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size="2x"
                                    className="transition-colors hover:cursor-pointer hover:text-gray-600"
                                    onClick={handleClose}
                                />
                            </div>
                        )}
                        {children}
                        {onSubmit && (
                            <button
                                className="mr-3 mt-4 rounded-lg bg-accent-100 px-4 py-2 text-white transition-colors hover:bg-accent-200"
                                onClick={onSubmit}
                            >
                                {submitText}
                            </button>
                        )}
                        <button
                            className="mt-4 rounded-lg bg-gray-400 px-4 py-2 text-white transition-colors hover:bg-gray-500"
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
