const SunIconOutline = ({ width = 16, height = 16, stroke = "currentColor", strokeWidth = "1.5", className = "" }) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 20 20"
		fill="none"
		stroke={stroke}
		strokeWidth={strokeWidth}
		className={className}
	>
		<circle cx="10" cy="10" r="3" />
		<path
			d="M10 1v2M10 17v2M1 10h2M17 10h2M3.5 3.5l1.5 1.5M15 15l1.5 1.5M3.5 16.5l1.5-1.5M15 5l1.5-1.5"
			strokeLinecap="round"
		/>
	</svg>
);

export default SunIconOutline;
