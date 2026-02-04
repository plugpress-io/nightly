import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../api/endpoints';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/toast';
import Navigation from '../components/navigation';
import Preview from '../components/preview';
import General from './general';
import Toggle from './toggle';
import Appearance from './appearance';
import Advanced from './advanced';

const defaultSettings = {
	enabled: true,
	default_mode: 'system',
	show_toggle: true,
	toggle_position: 'bottom-right',
	toggle_style: 'classic',
	toggle_size: 'm',
	exclude_selectors: '#wpadminbar',
	brightness: 0,
	contrast: 0,
	sepia: 0,
	grayscale: 0,
	transition_enabled: true,
	transition_duration: 300,
	schedule_enabled: false,
	schedule_start: '20:00',
	schedule_end: '06:00',
	keyboard_enabled: true,
	keyboard_shortcut: 'Ctrl+Shift+D',
	image_brightness: 100,
	video_brightness: 100,
	background_brightness: 100,
	theme: 'classic',
	custom_colors: {
		bg_primary: '#000000',
		bg_secondary: '#0a0a0a',
		text_primary: '#ffffff',
		text_secondary: '#a0a0a0',
		border: '#1a1a1a',
		accent: '#4a9eff',
	},
};

const selectorPattern = /^[a-zA-Z0-9#.\-_\s,:>\[\]()="'~+*\/]*$/;

const Settings = () => {
	const queryClient = useQueryClient();
	const { addToast } = useToast();
	const [activeTab, setActiveTab] = useState('general');

	const { data, isLoading } = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	const [formState, setFormState] = useState(defaultSettings);
	const [initialState, setInitialState] = useState(defaultSettings);

	useEffect(() => {
		if (data) {
			const nextState = {
				enabled: Boolean(data.enabled),
				default_mode: data.default_mode ?? 'system',
				show_toggle: Boolean(data.show_toggle),
				toggle_position: data.toggle_position ?? 'bottom-right',
				toggle_style: data.toggle_style ?? 'classic',
				toggle_size: data.toggle_size ?? 'm',
				exclude_selectors: data.exclude_selectors ?? '',
				brightness: data.brightness ?? 100,
				contrast: data.contrast ?? 100,
				sepia: data.sepia ?? 0,
				transition_enabled: data.transition_enabled ?? true,
				transition_duration: data.transition_duration ?? 300,
				schedule_enabled: data.schedule_enabled ?? false,
				schedule_start: data.schedule_start ?? '20:00',
				schedule_end: data.schedule_end ?? '06:00',
				keyboard_enabled: data.keyboard_enabled ?? true,
				keyboard_shortcut: data.keyboard_shortcut ?? 'Ctrl+Shift+D',
				image_brightness: data.image_brightness ?? 100,
				video_brightness: data.video_brightness ?? 100,
				background_brightness: data.background_brightness ?? 100,
				theme: data.theme ?? 'classic',
				custom_colors: data.custom_colors ?? {
					bg_primary: '#000000',
					bg_secondary: '#0a0a0a',
					text_primary: '#ffffff',
					text_secondary: '#a0a0a0',
					border: '#1a1a1a',
					accent: '#4a9eff',
				},
			};
			setFormState(nextState);
			setInitialState(nextState);
		}
	}, [data]);

	const mutation = useMutation({
		mutationFn: updateSettings,
		onSuccess: (updated) => {
			queryClient.setQueryData(['settings'], updated);
			setInitialState(updated);
			addToast('Settings saved successfully', 'success');
		},
		onError: (error) => {
			addToast(error.message || 'Failed to save settings', 'error');
		},
	});

	const isDirty = useMemo(() => {
		return JSON.stringify(formState) !== JSON.stringify(initialState);
	}, [formState, initialState]);

	const excludeSelectorsError = useMemo(() => {
		const value = formState.exclude_selectors.trim();
		return value.length > 0 && !selectorPattern.test(value);
	}, [formState.exclude_selectors]);

	const handleSave = () => {
		mutation.mutate(formState);
	};

	const handleReset = () => {
		if (window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
			setFormState(defaultSettings);
			mutation.mutate(defaultSettings);
		}
	};

	if (isLoading) {
		return (
			<div className="p-6">
				<p className="text-sm text-gray-600">Loading...</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
			{/* Left Side - Content */}
			<div>
				<Navigation activeTab={activeTab} onTabChange={setActiveTab} />

				<div className="bg-white rounded-lg border border-gray-200 p-6">
					{activeTab === 'general' && (
						<General formState={formState} setFormState={setFormState} />
					)}
					{activeTab === 'toggle' && (
						<Toggle formState={formState} setFormState={setFormState} />
					)}
					{activeTab === 'appearance' && (
						<Appearance formState={formState} setFormState={setFormState} />
					)}
					{activeTab === 'advanced' && (
						<Advanced formState={formState} setFormState={setFormState} />
					)}
				</div>

				{/* Save Button */}
				<div className="mt-6 flex items-center gap-4">
					<Button
						type="button"
						disabled={!isDirty || mutation.isPending || excludeSelectorsError}
						onClick={handleSave}
						className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{mutation.isPending ? 'Saving...' : 'Save Changes'}
					</Button>
					<Button
						type="button"
						disabled={mutation.isPending}
						onClick={handleReset}
						className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Reset to Defaults
					</Button>
					{isDirty && (
						<span className="text-xs text-amber-600">You have unsaved changes</span>
					)}
				</div>
			</div>

			{/* Right Side - Preview */}
			<div className="mt-14">
				<Preview settings={formState} />
			</div>
		</div>
	);
};

export default Settings;
