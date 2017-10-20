namespace Character.Skills {
    export class DoubleAttack extends Character.Skills.AbstractSkill {
        static TYPE = 1;

        constructor(cooldown: number = 0, damage: number = 0, stock: number = 0) {
            super(cooldown, damage, stock);
            this.image = '/assets/skills/skill01.png';
            this.name = 'Double attack';
        }

        public getType() {
            return Character.Skills.DoubleAttack.TYPE;
        }

    }
}