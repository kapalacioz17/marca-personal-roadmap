interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        className="block text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: 'rgba(196,181,253,0.7)' }}
      >
        {label}
      </label>
      {hint && <p className="text-xs" style={{ color: 'rgba(100,116,139,0.8)' }}>{hint}</p>}
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all ${props.className ?? ''}`}
      style={{
        background: 'rgba(124,58,237,0.04)',
        border: '1px solid rgba(124,58,237,0.18)',
        ...(props.style ?? {}),
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.55)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)';
        props.onFocus?.(e);
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.18)';
        e.currentTarget.style.boxShadow = 'none';
        props.onBlur?.(e);
      }}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea(props: TextareaProps) {
  return (
    <textarea
      rows={3}
      {...props}
      className={`w-full rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none ${props.className ?? ''}`}
      style={{
        background: 'rgba(124,58,237,0.04)',
        border: '1px solid rgba(124,58,237,0.18)',
        ...(props.style ?? {}),
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.55)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)';
        props.onFocus?.(e);
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.18)';
        e.currentTarget.style.boxShadow = 'none';
        props.onBlur?.(e);
      }}
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
    <div
      className={`rounded-xl p-5 space-y-4 ${className}`}
      style={{
        background: 'rgba(124,58,237,0.04)',
        border: '1px solid rgba(124,58,237,0.12)',
      }}
    >
      {title && (
        <h3
          className="text-sm font-semibold"
          style={{ color: '#c4b5fd' }}
        >
          {title}
        </h3>
      )}
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
          <div key={`${label}-${i}`} className="flex items-center gap-2">
            <span className="text-[11px] w-4 shrink-0 tabular-nums" style={{ color: 'rgba(124,58,237,0.5)' }}>
              {i + 1}.
            </span>
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
