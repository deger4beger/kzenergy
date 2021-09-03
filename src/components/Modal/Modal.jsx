import s from "./Modal.module.css"

export default function Modal({active, setActive, children, styles}) {
    return (
    	<div className={active ? s.modal + " " + s.active : s.modal} onClick={ () => setActive(false) }>
    		<div
    			className={active ? s.modal__content + " " + s.active : s.modal__content}
    			style={styles ? styles : null}
                onClick={e => e.stopPropagation()}>
                <span href="#" className={s.close} onClick={ () => setActive(false) } />
                {children}
            </div>
    	</div>
 	);
}