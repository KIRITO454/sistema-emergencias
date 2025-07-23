import { useState, useEffect, useRef } from "react"
import { User, Lock, Eye, EyeOff } from "lucide-react"

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [intentos, setIntentos] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const usuarioRef = useRef(null)

  useEffect(() => {
    usuarioRef.current.focus() // Foco automático
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (usuario === "" || password === "") {
      setError("Por favor, completa todos los campos.")
      return
    }
    if (usuario === "admin" && password === "1234") {
      onLogin(usuario)
      localStorage.setItem("usuario", usuario) // Guardar usuario
      setError("")
    } else {
      setIntentos((prev) => prev + 1)
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div
      style={{
        maxWidth: "460px",
        margin: "4rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
        {/* Usuario */}
        <label htmlFor="usuario" style={{ display: "block", marginBottom: "0.5rem" }}>
          Usuario:
        </label>
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <User
            size={16}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
              pointerEvents: "none",
            }}
          />
          <input
            ref={usuarioRef}
            id="usuario"
            name="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
            aria-required="true"
            aria-label="Campo de usuario"
            placeholder="Ingresa tu usuario"
            style={{
              width: "100%",
              padding: "0.5rem 0.5rem 0.5rem 2.5rem",
              borderRadius: "4px",
              border: `1px solid ${error ? "#e53935" : "#ccc"}`,
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        {/* Contraseña */}
        <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>
          Contraseña:
        </label>
        <div style={{ position: "relative" }}>
          <Lock
            size={16}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <input
            id="password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            aria-required="true"
            aria-label="Campo de contraseña"
            placeholder="Ingresa tu contraseña"
            style={{
              width: "100%",
              padding: "0.5rem 2.5rem 0.5rem 2.5rem",
              borderRadius: "4px",
              border: `1px solid ${error ? "#e53935" : "#ccc"}`,
              boxSizing: "border-box",
            }}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarPassword((prev) => !prev)}
            aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              lineHeight: 1,
              color: "#666",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#333")}
            onMouseLeave={(e) => (e.target.style.color = "#666")}
          >
            {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#e53935", marginTop: "0.5rem" }} role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        {/* Intentos fallidos */}
        {intentos >= 3 && (
          <p style={{ color: "orange", marginTop: "0.5rem" }}>Múltiples intentos fallidos. ¿Eres tú o un bot? 🤖</p>
        )}

        {/* Botón */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: isPressed ? "#0d47a1" : isHovered ? "#1976d2" : "#1565c0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease",
              transform: isPressed ? "scale(0.98)" : isHovered ? "scale(1.02)" : "scale(1)",
              boxShadow: isHovered ? "0 4px 8px rgba(21, 101, 192, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            aria-label="Botón para iniciar sesión"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false)
              setIsPressed(false)
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
