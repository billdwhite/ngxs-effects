import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import 'reflect-metadata';
import { FEATURE_EFFECTS } from './config/constans';
import { EffectStarterService } from './effect-starter.service';

// @dynamic
@NgModule()
export class NgxsEffectsModule {
    constructor(effectStarterService: EffectStarterService) {
        effectStarterService.start();
    }

    static forFeature(...effectsClasses: Type<any>[]): ModuleWithProviders<NgxsEffectsModule> {
        return {
            ngModule: NgxsEffectsModule,
            providers: [
                EffectStarterService,
                ...effectsClasses.map(effect => ({
                    provide: FEATURE_EFFECTS,
                    multi: true,
                    useClass: effect,
                })),
            ],
        };
    }
}

