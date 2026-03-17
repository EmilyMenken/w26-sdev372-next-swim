type SkillMeterProps = {
  label: string
  score: number
  max: number
  level: string
}

export default function SkillMeter({
  label,
  score,
  max,
  level
}: SkillMeterProps) {

  const percent = (score / max) * 100

  return (
    <div style={{ marginBottom: "20px" }}>
      <strong>{label}</strong>

      <div
        style={{
          background: "#eee",
          borderRadius: "8px",
          height: "14px",
          overflow: "hidden",
          margin: "6px 0"
        }}
      >
        <div
          data-testid="skill-bar"          // <-- added for testing
          style={{
            width: `${percent}%`,
            background: "#4cafef",
            height: "100%"
          }}
        />
      </div>

      <div style={{ fontSize: "14px" }}>
        {score} / {max} — {level}
      </div>
    </div>
  )
}