import { useState, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
//import { deflate } from "zlib";

interface IPortalProps {
    children: ReactNode,
    wrapperId?: string
}

function createElementAndAppendToBody(id: string) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", id);
    wrapperElement.setAttribute("class", "modal");
    document.body.append(wrapperElement);
    return wrapperElement;
}

const Portal = ({ children, wrapperId = "portal-wrapper" }: IPortalProps) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let created = false;
        if (!element) {
            created = true;
            element = createElementAndAppendToBody(wrapperId)
            setWrapperElement(element)
        }

        return () => {
            if (created) {
                element?.remove();
            }
        }

    }, [wrapperId])

    if (wrapperElement === null) return null;
    return createPortal(children, wrapperElement);
}

export default Portal;