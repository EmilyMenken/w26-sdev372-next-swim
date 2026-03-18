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
        background: "#A9CBD4",
        borderRadius: "8px",
        height: "14px",
        overflow: "hidden",
        margin: "6px 0"
      }}
    >
      <div
        data-testid="skill-bar"
        style={{
          width: `${percent}%`,
          background: "#42C1DF",
          height: "100%",
          transition: "width 0.4s ease"
        }}
      />
    </div>

      <div style={{ fontSize: "14px" }}>
        {score} / {max} — {level}
      </div>
    </div>
  )
}