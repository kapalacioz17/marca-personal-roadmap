interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full bg-[#1e1e2e] border border-[#3a3a5c] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all ${props.className ?? ''}`}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea(props: TextareaProps) {
  return (
    <textarea
      rows={3}
      {...props}
      className={`w-full bg-[#1e1e2e] border border-[#3a3a5c] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none ${props.className ?? ''}`}
    />
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}
export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-[#16162a] border border-[#2a2a3e] rounded-xl p-5 space-y-4 ${className}`}>
      {title && <h3 className="text-sm font-semibold text-purple-300">{title}</h3>}
      {children}
    </div>
  );
}

interface ListFieldProps {
  label: string;
  hint?: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  placeholder?: string;
}
export function ListField({ label, hint, values, onChange, placeholder }: ListFieldProps) {
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {values.map((v, i) => (
          // key estable basado en posición semántica: estas listas tienen longitud fija
          // (no se elimina del medio), así que el índice como key es seguro aquí.
          // MercadoModule tiene su propia tabla con keys por campo.
          <div key={`${label}-${i}`} className="flex items-center gap-2">
            <span className="text-slate-600 text-xs w-4 shrink-0">{i + 1}.</span>
            <Input
              value={v}
              onChange={e => onChange(i, e.target.value)}
              placeholder={placeholder ?? `Ítem ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </Field>
  );
}
