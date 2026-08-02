"use client"; // Este sí es un componente de cliente

export default function BotonBorrar({ 
  mensaje = "¿Estás seguro de que deseas eliminar este elemento?",
  className = "",
  children = "🗑️"
}: { 
  mensaje?: string; 
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button 
      type="submit" 
      onClick={(e) => {
        if (!window.confirm(mensaje)) {
          e.preventDefault(); // Frena el envío si el usuario cancela
        }
      }}
      className={className}
    >
      {children}
    </button>
  );
}