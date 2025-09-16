import Particles from "../home/partiles";

export default function Chat() {
    return (
        <div className="relative w-full h-[620px] overflow-hidden">
            <Particles
                particleColors={["#ffffff", "#ffa500"]}
                particleCount={500}
                particleSpread={6}
                speed={0.5}
                particleBaseSize={100}
                moveParticlesOnHover
                alphaParticles={false}
                disableRotation={false}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-8 -translate-y-8 md:-translate-y-16">
                <p>chats</p>
            </div>
        </div>
    )
}