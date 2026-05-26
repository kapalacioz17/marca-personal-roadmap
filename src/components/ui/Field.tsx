interface FieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{
        fontSize: '0.65rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        color: 'rgba(196,181,253,0.75)',
      }}>
        {label}
      </label>
      {hint && <p style={{ fontSize: '0.75rem', color: 'rgba(100,116,139,0.75)' }}>{hint}</p>}
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: '100%',
        background: 'rgba(7,7,18,0.6)',
        border: '1px solid rgba(124,58,237,0.28)',
        borderRadius: '8px',
        padding: '0.55rem 0.75rem',
        fontSize: '0.875rem',
        color: '#e2e8f0',
        outline: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        ...(props.style ?? {}),
      }}
      className={props.className}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.7)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.18)';
        props.onFocus?.(e);
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.28)';
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
      style={{
        width: '100%',
        background: 'rgba(7,7,18,0.6)',
        border: '1px solid rgba(124,58,237,0.28)',
        borderRadius: '8px',
        padding: '0.55rem 0.75rem',
        fontSize: '0.875rem',
        color: '#e2e8f0',
        outline: 'none',
        resize: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        ...(props.style ?? {}),
      }}
      className={props.className}
      onFocus={e => {
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.7)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.18)';
        props.onFocus?.(e);
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.28)';
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
      className={className}
      style={{
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {title && (
        <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c4b5fd' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {values.map((v, i) => (
          <div key={`${label}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.65rem', width: '1.1rem', flexShrink: 0,
              color: 'rgba(124,58,237,0.6)', fontVariantNumeric: 'tabular-nums',
            }}>
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
