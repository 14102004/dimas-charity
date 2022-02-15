
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (router) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var router__default = /*#__PURE__*/_interopDefaultLegacy(router);

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.3' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const page = writable(undefined);
    const params = writable(undefined);

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    const charities = writable([]);
    const charity = writable({});

    async function getCharities() {
        const res = await fetch("https://charity-api-bwa.herokuapp.com/charities");
        const data = await res.json();
        charities.set(data);

        if (res.ok) {
            return data;
        } else {
            throw new Error(data);
        }
    }

    async function getCharity(id) {
        const res = await fetch(
            `https://charity-api-bwa.herokuapp.com/charities/${id}`
        );
        const data = await res.json();
        charity.set(data);

        if (res.ok) {
            return data;
        } else {
            throw new Error(data);
        }
    }

    getCharities();

    /* src\components\Modal.svelte generated by Svelte v3.46.3 */

    function create_fragment$f(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src\components\Loader.svelte generated by Svelte v3.46.3 */

    const file$c = "src\\components\\Loader.svelte";

    function create_fragment$e(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let t;
    	let div1;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "double-bounce1");
    			add_location(div0, file$c, 2, 6, 55);
    			attr_dev(div1, "class", "double-bounce2");
    			add_location(div1, file$c, 3, 6, 93);
    			attr_dev(div2, "class", "spinner");
    			add_location(div2, file$c, 1, 4, 26);
    			attr_dev(div3, "id", "preloader");
    			add_location(div3, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Loader', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Loader> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Loader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Loader",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\components\CharityList.svelte generated by Svelte v3.46.3 */
    const file$b = "src\\components\\CharityList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (225:8) {:else}
    function create_else_block$1(ctx) {
    	let loader;
    	let current;
    	loader = new Loader({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(loader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(loader, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(loader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(225:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (65:12) {#if isModalOpen === true}
    function create_if_block$2(ctx) {
    	let modal;
    	let current;

    	modal = new Modal({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modal_changes = {};

    			if (dirty & /*$$scope, $charities*/ 130) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(65:12) {#if isModalOpen === true}",
    		ctx
    	});

    	return block;
    }

    // (66:14) <Modal>
    function create_default_slot(ctx) {
    	let div9;
    	let div8;
    	let div7;
    	let div0;
    	let h5;
    	let t0_value = /*charity*/ ctx[4].title + "";
    	let t0;
    	let t1;
    	let button0;
    	let span;
    	let t3;
    	let div5;
    	let form;
    	let div1;
    	let label0;
    	let t5;
    	let input0;
    	let t6;
    	let div2;
    	let label1;
    	let t8;
    	let input1;
    	let t9;
    	let div3;
    	let label2;
    	let t11;
    	let input2;
    	let t12;
    	let div4;
    	let input3;
    	let t13;
    	let label3;
    	let t15;
    	let div6;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div0 = element("div");
    			h5 = element("h5");
    			t0 = text(t0_value);
    			t1 = space();
    			button0 = element("button");
    			span = element("span");
    			span.textContent = "×";
    			t3 = space();
    			div5 = element("div");
    			form = element("form");
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Amount donation";
    			t5 = space();
    			input0 = element("input");
    			t6 = space();
    			div2 = element("div");
    			label1 = element("label");
    			label1.textContent = "Your name";
    			t8 = space();
    			input1 = element("input");
    			t9 = space();
    			div3 = element("div");
    			label2 = element("label");
    			label2.textContent = "Email address";
    			t11 = space();
    			input2 = element("input");
    			t12 = space();
    			div4 = element("div");
    			input3 = element("input");
    			t13 = space();
    			label3 = element("label");
    			label3.textContent = "I Agree";
    			t15 = space();
    			div6 = element("div");
    			button1 = element("button");
    			button1.textContent = "Continue";
    			attr_dev(h5, "class", "modal-title");
    			attr_dev(h5, "id", "exampleModalLabel");
    			add_location(h5, file$b, 77, 24, 2467);
    			attr_dev(span, "aria-hidden", "true");
    			add_location(span, file$b, 86, 26, 2881);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "close");
    			attr_dev(button0, "data-dismiss", "modal");
    			attr_dev(button0, "aria-label", "Close");
    			add_location(button0, file$b, 80, 24, 2614);
    			attr_dev(div0, "class", "modal-header");
    			add_location(div0, file$b, 76, 22, 2415);
    			attr_dev(label0, "for", "exampleInputAmount");
    			add_location(label0, file$b, 92, 28, 3147);
    			input0.required = true;
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "class", "form-control");
    			attr_dev(input0, "id", "exampleInputAmount");
    			attr_dev(input0, "aria-describedby", "amountHelp");
    			attr_dev(input0, "placeholder", "Enter amount");
    			add_location(input0, file$b, 95, 28, 3294);
    			attr_dev(div1, "class", "form-group");
    			add_location(div1, file$b, 91, 26, 3093);
    			attr_dev(label1, "for", "exampleInputName");
    			add_location(label1, file$b, 104, 28, 3730);
    			input1.required = true;
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "form-control");
    			attr_dev(input1, "id", "exampleInputName");
    			attr_dev(input1, "aria-describedby", "nameHelp");
    			attr_dev(input1, "placeholder", "Enter full name");
    			add_location(input1, file$b, 105, 28, 3807);
    			attr_dev(div2, "class", "form-group");
    			add_location(div2, file$b, 103, 26, 3676);
    			attr_dev(label2, "for", "exampleInputEmail1");
    			add_location(label2, file$b, 114, 28, 4240);
    			input2.required = true;
    			attr_dev(input2, "type", "email");
    			attr_dev(input2, "class", "form-control");
    			attr_dev(input2, "id", "exampleInputEmail1");
    			attr_dev(input2, "aria-describedby", "emailHelp");
    			attr_dev(input2, "placeholder", "Enter email");
    			add_location(input2, file$b, 115, 28, 4323);
    			attr_dev(div3, "class", "form-group");
    			add_location(div3, file$b, 113, 26, 4186);
    			attr_dev(input3, "type", "checkbox");
    			attr_dev(input3, "class", "form-check-input");
    			attr_dev(input3, "id", "exampleCheck1");
    			add_location(input3, file$b, 124, 28, 4756);
    			attr_dev(label3, "class", "form-check-label");
    			attr_dev(label3, "for", "exampleCheck1");
    			add_location(label3, file$b, 128, 28, 4948);
    			attr_dev(div4, "class", "form-check");
    			add_location(div4, file$b, 123, 26, 4702);
    			add_location(form, file$b, 90, 24, 3059);
    			attr_dev(div5, "class", "modal-body");
    			add_location(div5, file$b, 89, 22, 3009);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "btn btn-primary");
    			add_location(button1, file$b, 135, 24, 5250);
    			attr_dev(div6, "class", "modal-footer");
    			add_location(div6, file$b, 134, 22, 5198);
    			attr_dev(div7, "class", "modal-content");
    			add_location(div7, file$b, 75, 20, 2364);
    			attr_dev(div8, "class", "modal-dialog");
    			attr_dev(div8, "role", "document");
    			add_location(div8, file$b, 74, 18, 2300);
    			attr_dev(div9, "class", "modal fade show svelte-o68pa6");
    			attr_dev(div9, "id", "exampleModal");
    			attr_dev(div9, "tabindex", "-1");
    			attr_dev(div9, "role", "dialog");
    			attr_dev(div9, "aria-labelledby", "exampleModalLabel");
    			add_location(div9, file$b, 68, 16, 2074);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div0);
    			append_dev(div0, h5);
    			append_dev(h5, t0);
    			append_dev(div0, t1);
    			append_dev(div0, button0);
    			append_dev(button0, span);
    			append_dev(div7, t3);
    			append_dev(div7, div5);
    			append_dev(div5, form);
    			append_dev(form, div1);
    			append_dev(div1, label0);
    			append_dev(div1, t5);
    			append_dev(div1, input0);
    			append_dev(form, t6);
    			append_dev(form, div2);
    			append_dev(div2, label1);
    			append_dev(div2, t8);
    			append_dev(div2, input1);
    			append_dev(form, t9);
    			append_dev(form, div3);
    			append_dev(div3, label2);
    			append_dev(div3, t11);
    			append_dev(div3, input2);
    			append_dev(form, t12);
    			append_dev(form, div4);
    			append_dev(div4, input3);
    			append_dev(div4, t13);
    			append_dev(div4, label3);
    			append_dev(div7, t15);
    			append_dev(div7, div6);
    			append_dev(div6, button1);

    			if (!mounted) {
    				dispose = listen_dev(button0, "click", /*handleCloseModal*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$charities*/ 2 && t0_value !== (t0_value = /*charity*/ ctx[4].title + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(66:14) <Modal>",
    		ctx
    	});

    	return block;
    }

    // (60:8) {#each $charities as charity}
    function create_each_block(ctx) {
    	let div8;
    	let t0;
    	let div7;
    	let div2;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let div1;
    	let div0;
    	let p;
    	let span0;
    	let t2_value = calculateFunded(/*charity*/ ctx[4].pledged, /*charity*/ ctx[4].target) + "";
    	let t2;
    	let t3;
    	let p_intro;
    	let t4;
    	let div6;
    	let ul0;
    	let li0;
    	let a0;
    	let t5_value = /*charity*/ ctx[4].category + "";
    	let t5;
    	let t6;
    	let a1;
    	let t7_value = /*charity*/ ctx[4].title + "";
    	let t7;
    	let t8;
    	let ul1;
    	let li1;
    	let t9_value = formatCurrency(/*charity*/ ctx[4].pledged) + "";
    	let t9;
    	let t10;
    	let span1;
    	let t12;
    	let li2;
    	let span2;
    	let t13_value = calculateFunded(/*charity*/ ctx[4].pledged, /*charity*/ ctx[4].target) + "";
    	let t13;
    	let t14;
    	let span3;
    	let t16;
    	let li3;
    	let t17_value = calculateDaysRemaining(/*charity*/ ctx[4].date_end) + "";
    	let t17;
    	let t18;
    	let span4;
    	let t20;
    	let span5;
    	let t21;
    	let div5;
    	let div3;
    	let img1;
    	let img1_src_value;
    	let t22;
    	let div4;
    	let a2;
    	let span6;
    	let t24;
    	let t25_value = /*charity*/ ctx[4].profile_name + "";
    	let t25;
    	let t26;
    	let span7;
    	let t27;
    	let a3;
    	let t28;
    	let a3_href_value;
    	let t29;
    	let div8_intro;
    	let div8_outro;
    	let current;
    	let if_block = /*isModalOpen*/ ctx[0] === true && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			div7 = element("div");
    			div2 = element("div");
    			img0 = element("img");
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			p = element("p");
    			span0 = element("span");
    			t2 = text(t2_value);
    			t3 = text("\r\n                      %");
    			t4 = space();
    			div6 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			t5 = text(t5_value);
    			t6 = space();
    			a1 = element("a");
    			t7 = text(t7_value);
    			t8 = space();
    			ul1 = element("ul");
    			li1 = element("li");
    			t9 = text(t9_value);
    			t10 = space();
    			span1 = element("span");
    			span1.textContent = "Pledged";
    			t12 = space();
    			li2 = element("li");
    			span2 = element("span");
    			t13 = text(t13_value);
    			t14 = text("\r\n                    %\r\n                    ");
    			span3 = element("span");
    			span3.textContent = "Funded";
    			t16 = space();
    			li3 = element("li");
    			t17 = text(t17_value);
    			t18 = space();
    			span4 = element("span");
    			span4.textContent = "Days to go";
    			t20 = space();
    			span5 = element("span");
    			t21 = space();
    			div5 = element("div");
    			div3 = element("div");
    			img1 = element("img");
    			t22 = space();
    			div4 = element("div");
    			a2 = element("a");
    			span6 = element("span");
    			span6.textContent = "By";
    			t24 = space();
    			t25 = text(t25_value);
    			t26 = space();
    			span7 = element("span");
    			t27 = space();
    			a3 = element("a");
    			t28 = text("Donate This Cause");
    			t29 = space();
    			if (!src_url_equal(img0.src, img0_src_value = /*charity*/ ctx[4].thumbnail)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$b, 147, 16, 5641);
    			attr_dev(span0, "class", "number-percentage-count number-percentage");
    			attr_dev(span0, "data-value", "90");
    			attr_dev(span0, "data-animation-duration", "3500");
    			add_location(span0, file$b, 154, 22, 5985);
    			set_style(p, "left", "100%");
    			add_location(p, file$b, 153, 20, 5905);
    			attr_dev(div0, "class", "xs-skill-track");
    			set_style(div0, "width", calculateFunded(/*charity*/ ctx[4].pledged, /*charity*/ ctx[4].target) + "%");
    			add_location(div0, file$b, 150, 18, 5747);
    			attr_dev(div1, "class", "xs-skill-bar");
    			add_location(div1, file$b, 149, 16, 5701);
    			attr_dev(div2, "class", "xs-item-header");
    			add_location(div2, file$b, 145, 14, 5591);
    			attr_dev(a0, "href", "");
    			add_location(a0, file$b, 169, 20, 6581);
    			add_location(li0, file$b, 168, 18, 6555);
    			attr_dev(ul0, "class", "xs-simple-tag xs-mb-20");
    			add_location(ul0, file$b, 167, 16, 6500);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "xs-post-title xs-mb-30");
    			add_location(a1, file$b, 173, 16, 6684);
    			add_location(span1, file$b, 178, 20, 6918);
    			attr_dev(li1, "class", "pledged svelte-o68pa6");
    			add_location(li1, file$b, 176, 18, 6821);
    			attr_dev(span2, "class", "number-percentage-count number-percentage");
    			attr_dev(span2, "data-value", "90");
    			attr_dev(span2, "data-animation-duration", "3500");
    			add_location(span2, file$b, 181, 20, 7009);
    			add_location(span3, file$b, 188, 20, 7329);
    			add_location(li2, file$b, 180, 18, 6983);
    			add_location(span4, file$b, 192, 20, 7483);
    			add_location(li3, file$b, 190, 18, 7393);
    			attr_dev(ul1, "class", "xs-list-with-content svelte-o68pa6");
    			add_location(ul1, file$b, 175, 16, 6768);
    			attr_dev(span5, "class", "xs-separetor");
    			add_location(span5, file$b, 196, 16, 7576);
    			if (!src_url_equal(img1.src, img1_src_value = /*charity*/ ctx[4].profile_photo)) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$b, 200, 20, 7727);
    			attr_dev(div3, "class", "xs-round-avatar");
    			add_location(div3, file$b, 199, 18, 7676);
    			add_location(span6, file$b, 204, 22, 7902);
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$b, 203, 20, 7866);
    			attr_dev(div4, "class", "xs-avatar-title");
    			add_location(div4, file$b, 202, 18, 7815);
    			attr_dev(div5, "class", "row xs-margin-0");
    			add_location(div5, file$b, 198, 16, 7627);
    			attr_dev(span7, "class", "xs-separetor");
    			add_location(span7, file$b, 210, 16, 8061);
    			attr_dev(a3, "href", a3_href_value = "/donation/" + /*charity*/ ctx[4].id);
    			attr_dev(a3, "data-toggle", "modal");
    			attr_dev(a3, "data-target", "#exampleModal");
    			attr_dev(a3, "class", "btn btn-primary btn-block");
    			add_location(a3, file$b, 212, 16, 8112);
    			attr_dev(div6, "class", "xs-item-content");
    			add_location(div6, file$b, 166, 14, 6453);
    			attr_dev(div7, "class", "xs-popular-item xs-box-shadow");
    			add_location(div7, file$b, 144, 12, 5532);
    			attr_dev(div8, "class", "col-lg-4 col-md-6");
    			add_location(div8, file$b, 60, 10, 1795);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			if (if_block) if_block.m(div8, null);
    			append_dev(div8, t0);
    			append_dev(div8, div7);
    			append_dev(div7, div2);
    			append_dev(div2, img0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, span0);
    			append_dev(span0, t2);
    			append_dev(p, t3);
    			append_dev(div7, t4);
    			append_dev(div7, div6);
    			append_dev(div6, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(a0, t5);
    			append_dev(div6, t6);
    			append_dev(div6, a1);
    			append_dev(a1, t7);
    			append_dev(div6, t8);
    			append_dev(div6, ul1);
    			append_dev(ul1, li1);
    			append_dev(li1, t9);
    			append_dev(li1, t10);
    			append_dev(li1, span1);
    			append_dev(ul1, t12);
    			append_dev(ul1, li2);
    			append_dev(li2, span2);
    			append_dev(span2, t13);
    			append_dev(li2, t14);
    			append_dev(li2, span3);
    			append_dev(ul1, t16);
    			append_dev(ul1, li3);
    			append_dev(li3, t17);
    			append_dev(li3, t18);
    			append_dev(li3, span4);
    			append_dev(div6, t20);
    			append_dev(div6, span5);
    			append_dev(div6, t21);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, img1);
    			append_dev(div5, t22);
    			append_dev(div5, div4);
    			append_dev(div4, a2);
    			append_dev(a2, span6);
    			append_dev(a2, t24);
    			append_dev(a2, t25);
    			append_dev(div6, t26);
    			append_dev(div6, span7);
    			append_dev(div6, t27);
    			append_dev(div6, a3);
    			append_dev(a3, t28);
    			append_dev(div8, t29);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*isModalOpen*/ ctx[0] === true) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isModalOpen*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div8, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*$charities*/ 2 && !src_url_equal(img0.src, img0_src_value = /*charity*/ ctx[4].thumbnail)) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if ((!current || dirty & /*$charities*/ 2) && t2_value !== (t2_value = calculateFunded(/*charity*/ ctx[4].pledged, /*charity*/ ctx[4].target) + "")) set_data_dev(t2, t2_value);

    			if (!current || dirty & /*$charities*/ 2) {
    				set_style(div0, "width", calculateFunded(/*charity*/ ctx[4].pledged, /*charity*/ ctx[4].target) + "%");
    			}

    			if ((!current || dirty & /*$charities*/ 2) && t5_value !== (t5_value = /*charity*/ ctx[4].category + "")) set_data_dev(t5, t5_value);
    			if ((!current || dirty & /*$charities*/ 2) && t7_value !== (t7_value = /*charity*/ ctx[4].title + "")) set_data_dev(t7, t7_value);
    			if ((!current || dirty & /*$charities*/ 2) && t9_value !== (t9_value = formatCurrency(/*charity*/ ctx[4].pledged) + "")) set_data_dev(t9, t9_value);
    			if ((!current || dirty & /*$charities*/ 2) && t13_value !== (t13_value = calculateFunded(/*charity*/ ctx[4].pledged, /*charity*/ ctx[4].target) + "")) set_data_dev(t13, t13_value);
    			if ((!current || dirty & /*$charities*/ 2) && t17_value !== (t17_value = calculateDaysRemaining(/*charity*/ ctx[4].date_end) + "")) set_data_dev(t17, t17_value);

    			if (!current || dirty & /*$charities*/ 2 && !src_url_equal(img1.src, img1_src_value = /*charity*/ ctx[4].profile_photo)) {
    				attr_dev(img1, "src", img1_src_value);
    			}

    			if ((!current || dirty & /*$charities*/ 2) && t25_value !== (t25_value = /*charity*/ ctx[4].profile_name + "")) set_data_dev(t25, t25_value);

    			if (!current || dirty & /*$charities*/ 2 && a3_href_value !== (a3_href_value = "/donation/" + /*charity*/ ctx[4].id)) {
    				attr_dev(a3, "href", a3_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);

    			if (!p_intro) {
    				add_render_callback(() => {
    					p_intro = create_in_transition(p, fly, { delay: 3500, x: -100 });
    					p_intro.start();
    				});
    			}

    			add_render_callback(() => {
    				if (div8_outro) div8_outro.end(1);
    				div8_intro = create_in_transition(div8, slide, { delay: 1000 });
    				div8_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			if (div8_intro) div8_intro.invalidate();
    			div8_outro = create_out_transition(div8, fade, { delay: 1000 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			if (if_block) if_block.d();
    			if (detaching && div8_outro) div8_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(60:8) {#each $charities as charity}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let section;
    	let div3;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let span;
    	let t2;
    	let p;
    	let t3;
    	let br;
    	let t4;
    	let t5;
    	let div2;
    	let current;
    	let each_value = /*$charities*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$1(ctx);
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Popular Causes";
    			t1 = space();
    			span = element("span");
    			t2 = space();
    			p = element("p");
    			t3 = text("FundPress has built a platform focused on aiding entrepreneurs,\r\n            startups, and\r\n            ");
    			br = element("br");
    			t4 = text("\r\n            companies raise capital from anyone.");
    			t5 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			attr_dev(h2, "class", "xs-title");
    			add_location(h2, file$b, 46, 10, 1331);
    			attr_dev(span, "class", "xs-separetor dashed");
    			add_location(span, file$b, 47, 10, 1383);
    			add_location(br, file$b, 51, 12, 1552);
    			add_location(p, file$b, 48, 10, 1431);
    			attr_dev(div0, "class", "col-md-9 col-xl-9");
    			add_location(div0, file$b, 45, 8, 1288);
    			attr_dev(div1, "class", "xs-heading row xs-mb-60");
    			add_location(div1, file$b, 44, 6, 1241);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$b, 58, 6, 1727);
    			attr_dev(div3, "class", "container");
    			add_location(div3, file$b, 43, 4, 1210);
    			attr_dev(section, "id", "popularcause");
    			attr_dev(section, "class", "bg-gray waypoint-tigger xs-section-padding");
    			add_location(section, file$b, 42, 2, 1126);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, span);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(p, t3);
    			append_dev(p, br);
    			append_dev(p, t4);
    			append_dev(div3, t5);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$charities, calculateDaysRemaining, calculateFunded, formatCurrency, handleCloseModal, isModalOpen*/ 7) {
    				each_value = /*$charities*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div2, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						group_outros();

    						transition_out(each_1_else, 1, 1, () => {
    							each_1_else = null;
    						});

    						check_outros();
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block$1(ctx);
    					each_1_else.c();
    					transition_in(each_1_else, 1);
    					each_1_else.m(div2, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function calculateFunded(pledged, target) {
    	return Math.round(1 / (target / pledged) * 100);
    }

    function formatCurrency(nominal) {
    	return nominal.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    }

    function calculateDaysRemaining(date_end) {
    	const delta = date_end - new Date();
    	const oneDay = 24 * 60 * 60 * 1000;
    	return Math.round(Math.abs(delta / oneDay));
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $charities;
    	validate_store(charities, 'charities');
    	component_subscribe($$self, charities, $$value => $$invalidate(1, $charities = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CharityList', slots, []);
    	let isModalOpen = false;

    	function handleButton() {
    		$$invalidate(0, isModalOpen = true);
    	}

    	function handleCloseModal() {
    		$$invalidate(0, isModalOpen = false);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CharityList> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		fade,
    		slide,
    		fly,
    		charities,
    		charity,
    		Modal,
    		Loader,
    		isModalOpen,
    		calculateFunded,
    		formatCurrency,
    		calculateDaysRemaining,
    		handleButton,
    		handleCloseModal,
    		$charities
    	});

    	$$self.$inject_state = $$props => {
    		if ('isModalOpen' in $$props) $$invalidate(0, isModalOpen = $$props.isModalOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isModalOpen, $charities, handleCloseModal];
    }

    class CharityList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CharityList",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.46.3 */

    const file$a = "src\\components\\Header.svelte";

    function create_fragment$c(ctx) {
    	let header;
    	let div4;
    	let nav;
    	let div3;
    	let div0;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let ul;
    	let li0;
    	let a1;
    	let t2;
    	let li1;
    	let a2;
    	let t4;
    	let li2;
    	let a3;
    	let t6;
    	let div2;
    	let a4;
    	let span;
    	let i;
    	let t7;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div4 = element("div");
    			nav = element("nav");
    			div3 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "home";
    			t2 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "about";
    			t4 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "Contact";
    			t6 = space();
    			div2 = element("div");
    			a4 = element("a");
    			span = element("span");
    			i = element("i");
    			t7 = text("\r\n              Donate Now");
    			if (!src_url_equal(img.src, img_src_value = "/assets/images/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$a, 9, 14, 334);
    			attr_dev(a0, "class", "nav-brand");
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$a, 8, 12, 288);
    			attr_dev(div0, "class", "xs-logo-wraper col-lg-2 xs-padding-0");
    			add_location(div0, file$a, 7, 10, 224);
    			attr_dev(a1, "href", "/");
    			add_location(a1, file$a, 16, 16, 561);
    			add_location(li0, file$a, 15, 14, 539);
    			attr_dev(a2, "href", "/about");
    			add_location(a2, file$a, 19, 16, 640);
    			add_location(li1, file$a, 18, 14, 618);
    			attr_dev(a3, "href", "/contact");
    			add_location(a3, file$a, 22, 16, 725);
    			add_location(li2, file$a, 21, 14, 703);
    			attr_dev(ul, "class", "nav-menu");
    			add_location(ul, file$a, 14, 12, 502);
    			attr_dev(div1, "class", "col-lg-7");
    			add_location(div1, file$a, 13, 10, 466);
    			attr_dev(i, "class", "fa fa-heart");
    			add_location(i, file$a, 30, 16, 1032);
    			attr_dev(span, "class", "badge");
    			add_location(span, file$a, 29, 14, 994);
    			attr_dev(a4, "href", "#popularcause");
    			attr_dev(a4, "class", "btn btn-primary");
    			add_location(a4, file$a, 28, 12, 930);
    			attr_dev(div2, "class", "xs-navs-button d-flex-center-end col-lg-3");
    			add_location(div2, file$a, 27, 10, 861);
    			attr_dev(div3, "class", "nav-menus-wrapper row");
    			add_location(div3, file$a, 6, 8, 177);
    			attr_dev(nav, "class", "xs-menus");
    			add_location(nav, file$a, 3, 6, 107);
    			attr_dev(div4, "class", "container");
    			add_location(div4, file$a, 2, 4, 76);
    			attr_dev(header, "class", "xs-header header-transparent");
    			add_location(header, file$a, 1, 0, 25);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div4);
    			append_dev(div4, nav);
    			append_dev(nav, div3);
    			append_dev(div3, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img);
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a1);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			append_dev(li1, a2);
    			append_dev(ul, t4);
    			append_dev(ul, li2);
    			append_dev(li2, a3);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, a4);
    			append_dev(a4, span);
    			append_dev(span, i);
    			append_dev(a4, t7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\components\Welcome.svelte generated by Svelte v3.46.3 */

    const file$9 = "src\\components\\Welcome.svelte";

    function create_fragment$b(ctx) {
    	let section;
    	let div4;
    	let div3;
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let p;
    	let t2;
    	let br;
    	let t3;
    	let t4;
    	let a;
    	let t6;
    	let div2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div4 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Hunger is stalking the globe";
    			t1 = space();
    			p = element("p");
    			t2 = text("Hundreds of thousands of children experiencing or witnessing assault\r\n              ");
    			br = element("br");
    			t3 = text("\r\n              and other gender-based violence.");
    			t4 = space();
    			a = element("a");
    			a.textContent = "View Causes";
    			t6 = space();
    			div2 = element("div");
    			add_location(h2, file$9, 8, 12, 272);
    			add_location(br, file$9, 11, 14, 426);
    			add_location(p, file$9, 9, 12, 323);
    			attr_dev(a, "href", "#popularcause");
    			attr_dev(a, "class", "btn btn-outline-primary");
    			add_location(a, file$9, 14, 12, 512);
    			attr_dev(div0, "class", "xs-welcome-wraper color-white");
    			add_location(div0, file$9, 7, 10, 215);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$9, 6, 8, 180);
    			attr_dev(div2, "class", "xs-black-overlay");
    			add_location(div2, file$9, 21, 8, 733);
    			attr_dev(div3, "class", "xs-welcome-content");
    			set_style(div3, "background-image", "url(assets/images/slide1.png)");
    			add_location(div3, file$9, 3, 6, 63);
    			add_location(div4, file$9, 2, 4, 50);
    			attr_dev(section, "class", "");
    			add_location(section, file$9, 1, 0, 26);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(p, br);
    			append_dev(p, t3);
    			append_dev(div0, t4);
    			append_dev(div0, a);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Welcome', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Welcome> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Welcome extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Welcome",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\components\Promo.svelte generated by Svelte v3.46.3 */

    const file$8 = "src\\components\\Promo.svelte";

    function create_fragment$a(ctx) {
    	let section;
    	let div10;
    	let div0;
    	let h2;
    	let t0;
    	let span0;
    	let t2;
    	let br0;
    	let t3;
    	let t4;
    	let div9;
    	let div2;
    	let div1;
    	let span1;
    	let t5;
    	let h50;
    	let t6;
    	let br1;
    	let t7;
    	let t8;
    	let p0;
    	let t10;
    	let div4;
    	let div3;
    	let span2;
    	let t11;
    	let h51;
    	let t12;
    	let br2;
    	let t13;
    	let t14;
    	let p1;
    	let t16;
    	let div6;
    	let div5;
    	let span3;
    	let t17;
    	let h52;
    	let t18;
    	let br3;
    	let t19;
    	let t20;
    	let p2;
    	let t22;
    	let div8;
    	let div7;
    	let span4;
    	let t23;
    	let h53;
    	let t24;
    	let br4;
    	let t25;
    	let t26;
    	let p3;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div10 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text("We’ve funded\r\n          ");
    			span0 = element("span");
    			span0.textContent = "120,00 charity projects";
    			t2 = text("\r\n          for\r\n          ");
    			br0 = element("br");
    			t3 = text("\r\n          20M people around the world.");
    			t4 = space();
    			div9 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			span1 = element("span");
    			t5 = space();
    			h50 = element("h5");
    			t6 = text("Pure Water\r\n              ");
    			br1 = element("br");
    			t7 = text("\r\n              For Poor People");
    			t8 = space();
    			p0 = element("p");
    			p0.textContent = "663 million people drink dirty water. Learn how access to clean\r\n              water can improve health, boost local economies.";
    			t10 = space();
    			div4 = element("div");
    			div3 = element("div");
    			span2 = element("span");
    			t11 = space();
    			h51 = element("h5");
    			t12 = text("Healty Food\r\n              ");
    			br2 = element("br");
    			t13 = text("\r\n              For Poor People");
    			t14 = space();
    			p1 = element("p");
    			p1.textContent = "663 million people drink dirty water. Learn how access to clean\r\n              water can improve health, boost local economies.";
    			t16 = space();
    			div6 = element("div");
    			div5 = element("div");
    			span3 = element("span");
    			t17 = space();
    			h52 = element("h5");
    			t18 = text("Medical\r\n              ");
    			br3 = element("br");
    			t19 = text("\r\n              Facilities for People");
    			t20 = space();
    			p2 = element("p");
    			p2.textContent = "663 million people drink dirty water. Learn how access to clean\r\n              water can improve health, boost local economies.";
    			t22 = space();
    			div8 = element("div");
    			div7 = element("div");
    			span4 = element("span");
    			t23 = space();
    			h53 = element("h5");
    			t24 = text("Pure Education\r\n              ");
    			br4 = element("br");
    			t25 = text("\r\n              For Every Children");
    			t26 = space();
    			p3 = element("p");
    			p3.textContent = "663 million people drink dirty water. Learn how access to clean\r\n              water can improve health, boost local economies.";
    			add_location(span0, file$8, 6, 10, 231);
    			add_location(br0, file$8, 8, 10, 294);
    			attr_dev(h2, "class", "xs-mb-0 xs-title");
    			add_location(h2, file$8, 4, 8, 166);
    			attr_dev(div0, "class", "xs-heading xs-mb-70 text-center");
    			add_location(div0, file$8, 3, 6, 111);
    			attr_dev(span1, "class", "icon-water");
    			add_location(span1, file$8, 15, 12, 491);
    			add_location(br1, file$8, 18, 14, 578);
    			add_location(h50, file$8, 16, 12, 532);
    			add_location(p0, file$8, 21, 12, 648);
    			attr_dev(div1, "class", "xs-service-promo");
    			add_location(div1, file$8, 14, 10, 447);
    			attr_dev(div2, "class", "col-md-6 col-lg-3");
    			add_location(div2, file$8, 13, 8, 404);
    			attr_dev(span2, "class", "icon-groceries");
    			add_location(span2, file$8, 30, 12, 985);
    			add_location(br2, file$8, 33, 14, 1077);
    			add_location(h51, file$8, 31, 12, 1030);
    			add_location(p1, file$8, 36, 12, 1147);
    			attr_dev(div3, "class", "xs-service-promo");
    			add_location(div3, file$8, 29, 10, 941);
    			attr_dev(div4, "class", "col-md-6 col-lg-3");
    			add_location(div4, file$8, 28, 8, 898);
    			attr_dev(span3, "class", "icon-heartbeat");
    			add_location(span3, file$8, 45, 12, 1484);
    			add_location(br3, file$8, 48, 14, 1572);
    			add_location(h52, file$8, 46, 12, 1529);
    			add_location(p2, file$8, 51, 12, 1648);
    			attr_dev(div5, "class", "xs-service-promo");
    			add_location(div5, file$8, 44, 10, 1440);
    			attr_dev(div6, "class", "col-md-6 col-lg-3");
    			add_location(div6, file$8, 43, 8, 1397);
    			attr_dev(span4, "class", "icon-open-book");
    			add_location(span4, file$8, 60, 12, 1985);
    			add_location(br4, file$8, 63, 14, 2080);
    			add_location(h53, file$8, 61, 12, 2030);
    			add_location(p3, file$8, 66, 12, 2153);
    			attr_dev(div7, "class", "xs-service-promo");
    			add_location(div7, file$8, 59, 10, 1941);
    			attr_dev(div8, "class", "col-md-6 col-lg-3");
    			add_location(div8, file$8, 58, 8, 1898);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file$8, 12, 6, 377);
    			attr_dev(div10, "class", "container");
    			add_location(div10, file$8, 2, 4, 80);
    			attr_dev(section, "class", "xs-section-padding");
    			add_location(section, file$8, 1, 0, 38);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div10);
    			append_dev(div10, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			append_dev(h2, span0);
    			append_dev(h2, t2);
    			append_dev(h2, br0);
    			append_dev(h2, t3);
    			append_dev(div10, t4);
    			append_dev(div10, div9);
    			append_dev(div9, div2);
    			append_dev(div2, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t5);
    			append_dev(div1, h50);
    			append_dev(h50, t6);
    			append_dev(h50, br1);
    			append_dev(h50, t7);
    			append_dev(div1, t8);
    			append_dev(div1, p0);
    			append_dev(div9, t10);
    			append_dev(div9, div4);
    			append_dev(div4, div3);
    			append_dev(div3, span2);
    			append_dev(div3, t11);
    			append_dev(div3, h51);
    			append_dev(h51, t12);
    			append_dev(h51, br2);
    			append_dev(h51, t13);
    			append_dev(div3, t14);
    			append_dev(div3, p1);
    			append_dev(div9, t16);
    			append_dev(div9, div6);
    			append_dev(div6, div5);
    			append_dev(div5, span3);
    			append_dev(div5, t17);
    			append_dev(div5, h52);
    			append_dev(h52, t18);
    			append_dev(h52, br3);
    			append_dev(h52, t19);
    			append_dev(div5, t20);
    			append_dev(div5, p2);
    			append_dev(div9, t22);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, span4);
    			append_dev(div7, t23);
    			append_dev(div7, h53);
    			append_dev(h53, t24);
    			append_dev(h53, br4);
    			append_dev(h53, t25);
    			append_dev(div7, t26);
    			append_dev(div7, p3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Promo', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Promo> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Promo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Promo",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Footer.svelte generated by Svelte v3.46.3 */

    const file$7 = "src\\components\\Footer.svelte";

    function create_fragment$9(ctx) {
    	let footer;
    	let div5;
    	let div4;
    	let div3;
    	let div0;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let p0;
    	let t2;
    	let ul0;
    	let li0;
    	let a1;
    	let i0;
    	let t3;
    	let li1;
    	let a2;
    	let i1;
    	let t4;
    	let li2;
    	let a3;
    	let i2;
    	let t5;
    	let li3;
    	let a4;
    	let i3;
    	let t6;
    	let div1;
    	let h30;
    	let t8;
    	let ul1;
    	let li4;
    	let a5;
    	let t10;
    	let li5;
    	let a6;
    	let t12;
    	let li6;
    	let a7;
    	let t14;
    	let li7;
    	let a8;
    	let t16;
    	let li8;
    	let a9;
    	let t18;
    	let li9;
    	let a10;
    	let t20;
    	let div2;
    	let h31;
    	let t22;
    	let ul2;
    	let li10;
    	let i4;
    	let t23;
    	let t24;
    	let li11;
    	let i5;
    	let t25;
    	let t26;
    	let li12;
    	let i6;
    	let t27;
    	let a11;
    	let t29;
    	let div11;
    	let div10;
    	let div9;
    	let div7;
    	let div6;
    	let p1;
    	let t31;
    	let div8;
    	let nav;
    	let ul3;
    	let li13;
    	let a12;
    	let t33;
    	let li14;
    	let a13;
    	let t35;
    	let li15;
    	let a14;
    	let t37;
    	let div12;
    	let a15;
    	let i7;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "CharityPress online and raise money for charity and causes you’re\r\n              passionate about. CharityPress is an innovative, cost-effective\r\n              online.";
    			t2 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			i0 = element("i");
    			t3 = space();
    			li1 = element("li");
    			a2 = element("a");
    			i1 = element("i");
    			t4 = space();
    			li2 = element("li");
    			a3 = element("a");
    			i2 = element("i");
    			t5 = space();
    			li3 = element("li");
    			a4 = element("a");
    			i3 = element("i");
    			t6 = space();
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "About Us";
    			t8 = space();
    			ul1 = element("ul");
    			li4 = element("li");
    			a5 = element("a");
    			a5.textContent = "About employee";
    			t10 = space();
    			li5 = element("li");
    			a6 = element("a");
    			a6.textContent = "How it works";
    			t12 = space();
    			li6 = element("li");
    			a7 = element("a");
    			a7.textContent = "Careers";
    			t14 = space();
    			li7 = element("li");
    			a8 = element("a");
    			a8.textContent = "Press";
    			t16 = space();
    			li8 = element("li");
    			a9 = element("a");
    			a9.textContent = "Blog";
    			t18 = space();
    			li9 = element("li");
    			a10 = element("a");
    			a10.textContent = "Contact";
    			t20 = space();
    			div2 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Contact Us";
    			t22 = space();
    			ul2 = element("ul");
    			li10 = element("li");
    			i4 = element("i");
    			t23 = text("\r\n                Sector # 48, 123 Street, miosya road VIC 28, Australia.");
    			t24 = space();
    			li11 = element("li");
    			i5 = element("i");
    			t25 = text("\r\n                (800) 123.456.7890 (800) 123.456.7890 +00 99 88 5647");
    			t26 = space();
    			li12 = element("li");
    			i6 = element("i");
    			t27 = space();
    			a11 = element("a");
    			a11.textContent = "yourname@domain.com";
    			t29 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			p1 = element("p");
    			p1.textContent = "© Copyright 2018 Charity. - All Right's Reserved";
    			t31 = space();
    			div8 = element("div");
    			nav = element("nav");
    			ul3 = element("ul");
    			li13 = element("li");
    			a12 = element("a");
    			a12.textContent = "FAQ";
    			t33 = space();
    			li14 = element("li");
    			a13 = element("a");
    			a13.textContent = "Help Desk";
    			t35 = space();
    			li15 = element("li");
    			a14 = element("a");
    			a14.textContent = "Support";
    			t37 = space();
    			div12 = element("div");
    			a15 = element("a");
    			i7 = element("i");
    			if (!src_url_equal(img.src, img_src_value = "/assets/images/footer_logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$7, 7, 14, 293);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "xs-footer-logo");
    			add_location(a0, file$7, 6, 12, 242);
    			add_location(p0, file$7, 9, 12, 376);
    			attr_dev(i0, "class", "fa fa-facebook");
    			add_location(i0, file$7, 17, 18, 716);
    			attr_dev(a1, "href", "");
    			attr_dev(a1, "class", "color-facebook");
    			add_location(a1, file$7, 16, 16, 662);
    			add_location(li0, file$7, 15, 14, 640);
    			attr_dev(i1, "class", "fa fa-twitter");
    			add_location(i1, file$7, 22, 18, 878);
    			attr_dev(a2, "href", "");
    			attr_dev(a2, "class", "color-twitter");
    			add_location(a2, file$7, 21, 16, 825);
    			add_location(li1, file$7, 20, 14, 803);
    			attr_dev(i2, "class", "fa fa-dribbble");
    			add_location(i2, file$7, 27, 18, 1040);
    			attr_dev(a3, "href", "");
    			attr_dev(a3, "class", "color-dribbble");
    			add_location(a3, file$7, 26, 16, 986);
    			add_location(li2, file$7, 25, 14, 964);
    			attr_dev(i3, "class", "fa fa-pinterest");
    			add_location(i3, file$7, 32, 18, 1204);
    			attr_dev(a4, "href", "");
    			attr_dev(a4, "class", "color-pinterest");
    			add_location(a4, file$7, 31, 16, 1149);
    			add_location(li3, file$7, 30, 14, 1127);
    			attr_dev(ul0, "class", "xs-social-list-v2");
    			add_location(ul0, file$7, 14, 12, 594);
    			attr_dev(div0, "class", "col-lg-3 col-md-6 footer-widget xs-pr-20");
    			add_location(div0, file$7, 5, 10, 174);
    			attr_dev(h30, "class", "widget-title");
    			add_location(h30, file$7, 39, 12, 1426);
    			attr_dev(a5, "href", "/");
    			add_location(a5, file$7, 42, 16, 1543);
    			add_location(li4, file$7, 41, 14, 1521);
    			attr_dev(a6, "href", "#");
    			add_location(a6, file$7, 45, 16, 1632);
    			add_location(li5, file$7, 44, 14, 1610);
    			attr_dev(a7, "href", "#");
    			add_location(a7, file$7, 48, 16, 1719);
    			add_location(li6, file$7, 47, 14, 1697);
    			attr_dev(a8, "href", "#");
    			add_location(a8, file$7, 51, 16, 1801);
    			add_location(li7, file$7, 50, 14, 1779);
    			attr_dev(a9, "href", "#");
    			add_location(a9, file$7, 54, 16, 1881);
    			add_location(li8, file$7, 53, 14, 1859);
    			attr_dev(a10, "href", "/contact");
    			add_location(a10, file$7, 57, 16, 1960);
    			add_location(li9, file$7, 56, 14, 1938);
    			attr_dev(ul1, "class", "xs-footer-list");
    			add_location(ul1, file$7, 40, 12, 1478);
    			attr_dev(div1, "class", "col-lg-4 col-md-6 footer-widget");
    			add_location(div1, file$7, 38, 10, 1367);
    			attr_dev(h31, "class", "widget-title");
    			add_location(h31, file$7, 62, 12, 2119);
    			attr_dev(i4, "class", "fa fa-home");
    			add_location(i4, file$7, 65, 16, 2236);
    			add_location(li10, file$7, 64, 14, 2214);
    			attr_dev(i5, "class", "fa fa-phone");
    			add_location(i5, file$7, 69, 16, 2392);
    			add_location(li11, file$7, 68, 14, 2370);
    			attr_dev(i6, "class", "fa fa-envelope-o");
    			add_location(i6, file$7, 73, 16, 2546);
    			attr_dev(a11, "href", "mailto:yourname@domain.com");
    			add_location(a11, file$7, 74, 16, 2594);
    			add_location(li12, file$7, 72, 14, 2524);
    			attr_dev(ul2, "class", "xs-info-list");
    			add_location(ul2, file$7, 63, 12, 2173);
    			attr_dev(div2, "class", "col-lg-4 col-md-6 footer-widget");
    			add_location(div2, file$7, 61, 10, 2060);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file$7, 4, 8, 145);
    			attr_dev(div4, "class", "xs-footer-top-layer");
    			add_location(div4, file$7, 3, 6, 102);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$7, 2, 4, 71);
    			add_location(p1, file$7, 87, 14, 2984);
    			attr_dev(div6, "class", "xs-copyright-text");
    			add_location(div6, file$7, 86, 12, 2937);
    			attr_dev(div7, "class", "col-md-6");
    			add_location(div7, file$7, 85, 10, 2901);
    			attr_dev(a12, "href", "#");
    			add_location(a12, file$7, 94, 18, 3220);
    			add_location(li13, file$7, 93, 16, 3196);
    			attr_dev(a13, "href", "#");
    			add_location(a13, file$7, 97, 18, 3304);
    			add_location(li14, file$7, 96, 16, 3280);
    			attr_dev(a14, "href", "#");
    			add_location(a14, file$7, 100, 18, 3394);
    			add_location(li15, file$7, 99, 16, 3370);
    			add_location(ul3, file$7, 92, 14, 3174);
    			attr_dev(nav, "class", "xs-footer-menu");
    			add_location(nav, file$7, 91, 12, 3130);
    			attr_dev(div8, "class", "col-md-6");
    			add_location(div8, file$7, 90, 10, 3094);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file$7, 84, 8, 2872);
    			attr_dev(div10, "class", "xs-copyright");
    			add_location(div10, file$7, 83, 6, 2836);
    			attr_dev(div11, "class", "container");
    			add_location(div11, file$7, 82, 4, 2805);
    			attr_dev(i7, "class", "fa fa-angle-up");
    			add_location(i7, file$7, 110, 8, 3635);
    			attr_dev(a15, "href", "#");
    			attr_dev(a15, "class", "xs-back-to-top");
    			add_location(a15, file$7, 109, 6, 3590);
    			attr_dev(div12, "class", "xs-back-to-top-wraper");
    			add_location(div12, file$7, 108, 4, 3547);
    			attr_dev(footer, "class", "xs-footer-section");
    			add_location(footer, file$7, 1, 0, 31);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			append_dev(div0, t2);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a1);
    			append_dev(a1, i0);
    			append_dev(ul0, t3);
    			append_dev(ul0, li1);
    			append_dev(li1, a2);
    			append_dev(a2, i1);
    			append_dev(ul0, t4);
    			append_dev(ul0, li2);
    			append_dev(li2, a3);
    			append_dev(a3, i2);
    			append_dev(ul0, t5);
    			append_dev(ul0, li3);
    			append_dev(li3, a4);
    			append_dev(a4, i3);
    			append_dev(div3, t6);
    			append_dev(div3, div1);
    			append_dev(div1, h30);
    			append_dev(div1, t8);
    			append_dev(div1, ul1);
    			append_dev(ul1, li4);
    			append_dev(li4, a5);
    			append_dev(ul1, t10);
    			append_dev(ul1, li5);
    			append_dev(li5, a6);
    			append_dev(ul1, t12);
    			append_dev(ul1, li6);
    			append_dev(li6, a7);
    			append_dev(ul1, t14);
    			append_dev(ul1, li7);
    			append_dev(li7, a8);
    			append_dev(ul1, t16);
    			append_dev(ul1, li8);
    			append_dev(li8, a9);
    			append_dev(ul1, t18);
    			append_dev(ul1, li9);
    			append_dev(li9, a10);
    			append_dev(div3, t20);
    			append_dev(div3, div2);
    			append_dev(div2, h31);
    			append_dev(div2, t22);
    			append_dev(div2, ul2);
    			append_dev(ul2, li10);
    			append_dev(li10, i4);
    			append_dev(li10, t23);
    			append_dev(ul2, t24);
    			append_dev(ul2, li11);
    			append_dev(li11, i5);
    			append_dev(li11, t25);
    			append_dev(ul2, t26);
    			append_dev(ul2, li12);
    			append_dev(li12, i6);
    			append_dev(li12, t27);
    			append_dev(li12, a11);
    			append_dev(footer, t29);
    			append_dev(footer, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div7);
    			append_dev(div7, div6);
    			append_dev(div6, p1);
    			append_dev(div9, t31);
    			append_dev(div9, div8);
    			append_dev(div8, nav);
    			append_dev(nav, ul3);
    			append_dev(ul3, li13);
    			append_dev(li13, a12);
    			append_dev(ul3, t33);
    			append_dev(ul3, li14);
    			append_dev(li14, a13);
    			append_dev(ul3, t35);
    			append_dev(ul3, li15);
    			append_dev(li15, a14);
    			append_dev(footer, t37);
    			append_dev(footer, div12);
    			append_dev(div12, a15);
    			append_dev(a15, i7);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\pages\Home.svelte generated by Svelte v3.46.3 */

    function create_fragment$8(ctx) {
    	let header;
    	let t0;
    	let welcome;
    	let t1;
    	let charitylist;
    	let t2;
    	let promo;
    	let t3;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	welcome = new Welcome({ $$inline: true });
    	charitylist = new CharityList({ $$inline: true });
    	promo = new Promo({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(welcome.$$.fragment);
    			t1 = space();
    			create_component(charitylist.$$.fragment);
    			t2 = space();
    			create_component(promo.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(welcome, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(charitylist, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(promo, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(welcome.$$.fragment, local);
    			transition_in(charitylist.$$.fragment, local);
    			transition_in(promo.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(welcome.$$.fragment, local);
    			transition_out(charitylist.$$.fragment, local);
    			transition_out(promo.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(welcome, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(charitylist, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(promo, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);

    	onDestroy(function () {
    		window.scrollTo(0, 0);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onDestroy,
    		CharityList,
    		Header,
    		Welcome,
    		Promo,
    		Footer,
    		Loader
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\pages\About.svelte generated by Svelte v3.46.3 */
    const file$6 = "src\\pages\\About.svelte";

    function create_fragment$7(ctx) {
    	let header;
    	let t0;
    	let section0;
    	let div0;
    	let t1;
    	let div2;
    	let div1;
    	let h20;
    	let t3;
    	let p0;
    	let t5;
    	let ul0;
    	let li0;
    	let a0;
    	let t7;
    	let t8;
    	let main;
    	let div8;
    	let div7;
    	let div6;
    	let div5;
    	let div4;
    	let img;
    	let img_src_value;
    	let t9;
    	let div3;
    	let a1;
    	let i0;
    	let t10;
    	let section1;
    	let div19;
    	let div11;
    	let div10;
    	let div9;
    	let h21;
    	let t11;
    	let span0;
    	let t13;
    	let t14;
    	let div18;
    	let div13;
    	let div12;
    	let h30;
    	let t16;
    	let p1;
    	let t18;
    	let div15;
    	let div14;
    	let h31;
    	let t20;
    	let p2;
    	let t22;
    	let div17;
    	let div16;
    	let h32;
    	let t24;
    	let ul1;
    	let li1;
    	let t26;
    	let li2;
    	let t28;
    	let li3;
    	let t30;
    	let li4;
    	let t32;
    	let div32;
    	let div30;
    	let div20;
    	let h22;
    	let t34;
    	let div29;
    	let div22;
    	let div21;
    	let i1;
    	let t35;
    	let span1;
    	let t37;
    	let span2;
    	let t39;
    	let small0;
    	let t41;
    	let div24;
    	let div23;
    	let i2;
    	let t42;
    	let span3;
    	let t44;
    	let span4;
    	let t46;
    	let small1;
    	let t48;
    	let div26;
    	let div25;
    	let i3;
    	let t49;
    	let span5;
    	let t51;
    	let span6;
    	let t53;
    	let small2;
    	let t55;
    	let div28;
    	let div27;
    	let i4;
    	let t56;
    	let span7;
    	let t58;
    	let span8;
    	let t60;
    	let small3;
    	let t62;
    	let div31;
    	let t63;
    	let section2;
    	let div44;
    	let div34;
    	let div33;
    	let h23;
    	let t65;
    	let span9;
    	let t66;
    	let p3;
    	let t68;
    	let div43;
    	let div36;
    	let div35;
    	let span10;
    	let t69;
    	let h50;
    	let t70;
    	let br0;
    	let t71;
    	let t72;
    	let p4;
    	let t74;
    	let div38;
    	let div37;
    	let span11;
    	let t75;
    	let h51;
    	let t76;
    	let br1;
    	let t77;
    	let t78;
    	let p5;
    	let t80;
    	let div40;
    	let div39;
    	let span12;
    	let t81;
    	let h52;
    	let t82;
    	let br2;
    	let t83;
    	let t84;
    	let p6;
    	let t86;
    	let div42;
    	let div41;
    	let span13;
    	let t87;
    	let h53;
    	let t88;
    	let br3;
    	let t89;
    	let t90;
    	let p7;
    	let t92;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			section0 = element("section");
    			div0 = element("div");
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h20 = element("h2");
    			h20.textContent = "About Us";
    			t3 = space();
    			p0 = element("p");
    			p0.textContent = "Give a helping hand for poor people";
    			t5 = space();
    			ul0 = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Home /";
    			t7 = text("\r\n            About");
    			t8 = space();
    			main = element("main");
    			div8 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			div5 = element("div");
    			div4 = element("div");
    			img = element("img");
    			t9 = space();
    			div3 = element("div");
    			a1 = element("a");
    			i0 = element("i");
    			t10 = space();
    			section1 = element("section");
    			div19 = element("div");
    			div11 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			h21 = element("h2");
    			t11 = text("We are an Globian non-profit organization that\r\n                ");
    			span0 = element("span");
    			span0.textContent = "supports";
    			t13 = text("\r\n                good causes and positive change all over the world.");
    			t14 = space();
    			div18 = element("div");
    			div13 = element("div");
    			div12 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Our Mission";
    			t16 = space();
    			p1 = element("p");
    			p1.textContent = "The CharityPress community was named a “Top 25 Best Global\r\n                Philanthropist” by Barron’s. We beat Oprah. And, Mashable named\r\n                CharityPress something like that.";
    			t18 = space();
    			div15 = element("div");
    			div14 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Our Vission";
    			t20 = space();
    			p2 = element("p");
    			p2.textContent = "The Globian Fund for Charities seeks positive change around the\r\n                world through support of non-profit organizations dedicated to\r\n                social, cultural.";
    			t22 = space();
    			div17 = element("div");
    			div16 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Our Values";
    			t24 = space();
    			ul1 = element("ul");
    			li1 = element("li");
    			li1.textContent = "Accountability";
    			t26 = space();
    			li2 = element("li");
    			li2.textContent = "Reliability";
    			t28 = space();
    			li3 = element("li");
    			li3.textContent = "Cost-effectiveness";
    			t30 = space();
    			li4 = element("li");
    			li4.textContent = "Personal service";
    			t32 = space();
    			div32 = element("div");
    			div30 = element("div");
    			div20 = element("div");
    			h22 = element("h2");
    			h22.textContent = "Our agency has been present for over 30 years. We make the best for\r\n            all our children.";
    			t34 = space();
    			div29 = element("div");
    			div22 = element("div");
    			div21 = element("div");
    			i1 = element("i");
    			t35 = space();
    			span1 = element("span");
    			span1.textContent = "0";
    			t37 = space();
    			span2 = element("span");
    			span2.textContent = "M";
    			t39 = space();
    			small0 = element("small");
    			small0.textContent = "Causes";
    			t41 = space();
    			div24 = element("div");
    			div23 = element("div");
    			i2 = element("i");
    			t42 = space();
    			span3 = element("span");
    			span3.textContent = "0";
    			t44 = space();
    			span4 = element("span");
    			span4.textContent = "k";
    			t46 = space();
    			small1 = element("small");
    			small1.textContent = "Valunteer";
    			t48 = space();
    			div26 = element("div");
    			div25 = element("div");
    			i3 = element("i");
    			t49 = space();
    			span5 = element("span");
    			span5.textContent = "0";
    			t51 = space();
    			span6 = element("span");
    			span6.textContent = "k";
    			t53 = space();
    			small2 = element("small");
    			small2.textContent = "Childrens";
    			t55 = space();
    			div28 = element("div");
    			div27 = element("div");
    			i4 = element("i");
    			t56 = space();
    			span7 = element("span");
    			span7.textContent = "0";
    			t58 = space();
    			span8 = element("span");
    			span8.textContent = "k";
    			t60 = space();
    			small3 = element("small");
    			small3.textContent = "Countrys";
    			t62 = space();
    			div31 = element("div");
    			t63 = space();
    			section2 = element("section");
    			div44 = element("div");
    			div34 = element("div");
    			div33 = element("div");
    			h23 = element("h2");
    			h23.textContent = "What We Do";
    			t65 = space();
    			span9 = element("span");
    			t66 = space();
    			p3 = element("p");
    			p3.textContent = "It allows you to gather monthly subscriptions from fans to help fund\r\n              your creative projects. They also encourage their users to offer\r\n              rewards to fans as a way to repay them for their support.";
    			t68 = space();
    			div43 = element("div");
    			div36 = element("div");
    			div35 = element("div");
    			span10 = element("span");
    			t69 = space();
    			h50 = element("h5");
    			t70 = text("Pure Water\r\n                ");
    			br0 = element("br");
    			t71 = text("\r\n                For Poor People");
    			t72 = space();
    			p4 = element("p");
    			p4.textContent = "663 million people drink dirty water. Learn how access to clean\r\n                water can improve health, boost local economies.";
    			t74 = space();
    			div38 = element("div");
    			div37 = element("div");
    			span11 = element("span");
    			t75 = space();
    			h51 = element("h5");
    			t76 = text("Healty Food\r\n                ");
    			br1 = element("br");
    			t77 = text("\r\n                For Poor People");
    			t78 = space();
    			p5 = element("p");
    			p5.textContent = "663 million people drink dirty water. Learn how access to clean\r\n                water can improve health, boost local economies.";
    			t80 = space();
    			div40 = element("div");
    			div39 = element("div");
    			span12 = element("span");
    			t81 = space();
    			h52 = element("h5");
    			t82 = text("Medical\r\n                ");
    			br2 = element("br");
    			t83 = text("\r\n                Facilities for People");
    			t84 = space();
    			p6 = element("p");
    			p6.textContent = "663 million people drink dirty water. Learn how access to clean\r\n                water can improve health, boost local economies.";
    			t86 = space();
    			div42 = element("div");
    			div41 = element("div");
    			span13 = element("span");
    			t87 = space();
    			h53 = element("h5");
    			t88 = text("Pure Education\r\n                ");
    			br3 = element("br");
    			t89 = text("\r\n                For Every Children");
    			t90 = space();
    			p7 = element("p");
    			p7.textContent = "663 million people drink dirty water. Learn how access to clean\r\n                water can improve health, boost local economies.";
    			t92 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div0, "class", "xs-black-overlay");
    			add_location(div0, file$6, 11, 4, 344);
    			add_location(h20, file$6, 14, 8, 472);
    			add_location(p0, file$6, 15, 8, 499);
    			attr_dev(a0, "href", "index.html");
    			attr_dev(a0, "class", "color-white");
    			add_location(a0, file$6, 18, 12, 645);
    			attr_dev(li0, "class", "badge badge-pill badge-primary");
    			add_location(li0, file$6, 17, 10, 588);
    			attr_dev(ul0, "class", "xs-breadcumb");
    			add_location(ul0, file$6, 16, 8, 551);
    			attr_dev(div1, "class", "color-white xs-inner-banner-content");
    			add_location(div1, file$6, 13, 6, 413);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$6, 12, 4, 382);
    			attr_dev(section0, "class", "xs-banner-inner-section parallax-window");
    			set_style(section0, "background-image", "url('assets/images/about_bg.png')");
    			add_location(section0, file$6, 8, 2, 212);
    			if (!src_url_equal(img.src, img_src_value = "assets/images/video_img.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$6, 35, 14, 1134);
    			attr_dev(i0, "class", "fa fa-play");
    			add_location(i0, file$6, 40, 18, 1400);
    			attr_dev(a1, "href", "https://www.youtube.com/watch?v=Tb1HsAGy-ls");
    			attr_dev(a1, "class", "xs-video-popup xs-round-btn");
    			add_location(a1, file$6, 37, 16, 1252);
    			attr_dev(div3, "class", "xs-video-popup-content");
    			add_location(div3, file$6, 36, 14, 1198);
    			attr_dev(div4, "class", "xs-video-popup-wraper");
    			add_location(div4, file$6, 34, 12, 1083);
    			attr_dev(div5, "class", "col-lg-8 content-center");
    			add_location(div5, file$6, 33, 10, 1032);
    			attr_dev(div6, "class", "row");
    			add_location(div6, file$6, 32, 8, 1003);
    			attr_dev(div7, "class", "container");
    			add_location(div7, file$6, 31, 6, 970);
    			attr_dev(div8, "class", "xs-video-popup-section");
    			add_location(div8, file$6, 30, 4, 926);
    			attr_dev(span0, "class", "color-green");
    			add_location(span0, file$6, 62, 16, 2144);
    			attr_dev(h21, "class", "xs-mb-0 xs-title");
    			add_location(h21, file$6, 60, 14, 2033);
    			attr_dev(div9, "class", "xs-heading xs-mb-100 text-center");
    			add_location(div9, file$6, 59, 12, 1971);
    			attr_dev(div10, "class", "col-lg-11 content-center");
    			add_location(div10, file$6, 58, 10, 1919);
    			attr_dev(div11, "class", "row");
    			add_location(div11, file$6, 57, 8, 1890);
    			add_location(h30, file$6, 72, 14, 2477);
    			attr_dev(p1, "class", "lead");
    			add_location(p1, file$6, 73, 14, 2513);
    			attr_dev(div12, "class", "xs-about-feature");
    			add_location(div12, file$6, 71, 12, 2431);
    			attr_dev(div13, "class", "col-md-4");
    			add_location(div13, file$6, 70, 10, 2395);
    			add_location(h31, file$6, 82, 14, 2889);
    			attr_dev(p2, "class", "lead");
    			add_location(p2, file$6, 83, 14, 2925);
    			attr_dev(div14, "class", "xs-about-feature");
    			add_location(div14, file$6, 81, 12, 2843);
    			attr_dev(div15, "class", "col-md-4");
    			add_location(div15, file$6, 80, 10, 2807);
    			add_location(h32, file$6, 92, 14, 3289);
    			add_location(li1, file$6, 94, 16, 3386);
    			add_location(li2, file$6, 95, 16, 3427);
    			add_location(li3, file$6, 96, 16, 3465);
    			add_location(li4, file$6, 97, 16, 3510);
    			attr_dev(ul1, "class", "xs-unorder-list play green-icon");
    			add_location(ul1, file$6, 93, 14, 3324);
    			attr_dev(div16, "class", "xs-about-feature");
    			add_location(div16, file$6, 91, 12, 3243);
    			attr_dev(div17, "class", "col-md-4");
    			add_location(div17, file$6, 90, 10, 3207);
    			attr_dev(div18, "class", "row");
    			add_location(div18, file$6, 69, 8, 2366);
    			attr_dev(div19, "class", "container");
    			add_location(div19, file$6, 56, 6, 1857);
    			attr_dev(section1, "class", "xs-content-section-padding");
    			add_location(section1, file$6, 55, 4, 1805);
    			attr_dev(h22, "class", "xs-title color-white small");
    			add_location(h22, file$6, 115, 10, 4070);
    			attr_dev(div20, "class", "row col-lg-10 xs-heading mx-auto");
    			add_location(div20, file$6, 114, 8, 4012);
    			attr_dev(i1, "class", "icon-donation_2");
    			add_location(i1, file$6, 123, 14, 4397);
    			attr_dev(span1, "class", "number-percentage-count number-percentage");
    			attr_dev(span1, "data-value", "10");
    			attr_dev(span1, "data-animation-duration", "3500");
    			add_location(span1, file$6, 124, 14, 4442);
    			add_location(span2, file$6, 130, 14, 4654);
    			add_location(small0, file$6, 131, 14, 4684);
    			attr_dev(div21, "class", "xs-single-funFact color-white");
    			add_location(div21, file$6, 122, 12, 4338);
    			attr_dev(div22, "class", "col-lg-3 col-md-6");
    			add_location(div22, file$6, 121, 10, 4293);
    			attr_dev(i2, "class", "icon-group");
    			add_location(i2, file$6, 136, 14, 4859);
    			attr_dev(span3, "class", "number-percentage-count number-percentage");
    			attr_dev(span3, "data-value", "25");
    			attr_dev(span3, "data-animation-duration", "3500");
    			add_location(span3, file$6, 137, 14, 4899);
    			add_location(span4, file$6, 143, 14, 5111);
    			add_location(small1, file$6, 144, 14, 5141);
    			attr_dev(div23, "class", "xs-single-funFact color-white");
    			add_location(div23, file$6, 135, 12, 4800);
    			attr_dev(div24, "class", "col-lg-3 col-md-6");
    			add_location(div24, file$6, 134, 10, 4755);
    			attr_dev(i3, "class", "icon-children");
    			add_location(i3, file$6, 149, 14, 5319);
    			attr_dev(span5, "class", "number-percentage-count number-percentage");
    			attr_dev(span5, "data-value", "30");
    			attr_dev(span5, "data-animation-duration", "3500");
    			add_location(span5, file$6, 150, 14, 5362);
    			add_location(span6, file$6, 156, 14, 5574);
    			add_location(small2, file$6, 157, 14, 5604);
    			attr_dev(div25, "class", "xs-single-funFact color-white");
    			add_location(div25, file$6, 148, 12, 5260);
    			attr_dev(div26, "class", "col-lg-3 col-md-6");
    			add_location(div26, file$6, 147, 10, 5215);
    			attr_dev(i4, "class", "icon-planet-earth");
    			add_location(i4, file$6, 162, 14, 5782);
    			attr_dev(span7, "class", "number-percentage-count number-percentage");
    			attr_dev(span7, "data-value", "14");
    			attr_dev(span7, "data-animation-duration", "3500");
    			add_location(span7, file$6, 163, 14, 5829);
    			add_location(span8, file$6, 169, 14, 6041);
    			add_location(small3, file$6, 170, 14, 6071);
    			attr_dev(div27, "class", "xs-single-funFact color-white");
    			add_location(div27, file$6, 161, 12, 5723);
    			attr_dev(div28, "class", "col-lg-3 col-md-6");
    			add_location(div28, file$6, 160, 10, 5678);
    			attr_dev(div29, "class", "row");
    			add_location(div29, file$6, 120, 8, 4264);
    			attr_dev(div30, "class", "container");
    			add_location(div30, file$6, 113, 6, 3979);
    			attr_dev(div31, "class", "xs-black-overlay");
    			add_location(div31, file$6, 177, 6, 6228);
    			attr_dev(div32, "class", "xs-funfact-section xs-content-section-padding waypoint-tigger parallax-window");
    			set_style(div32, "background-image", "url('assets/images/backgrounds/parallax_1.jpg')");
    			add_location(div32, file$6, 109, 4, 3785);
    			attr_dev(h23, "class", "xs-title");
    			add_location(h23, file$6, 186, 12, 6521);
    			attr_dev(span9, "class", "xs-separetor dashed");
    			add_location(span9, file$6, 187, 12, 6571);
    			add_location(p3, file$6, 188, 12, 6621);
    			attr_dev(div33, "class", "col-md-9 col-xl-9");
    			add_location(div33, file$6, 185, 10, 6476);
    			attr_dev(div34, "class", "xs-heading row xs-mb-60");
    			add_location(div34, file$6, 184, 8, 6427);
    			attr_dev(span10, "class", "icon-water color-orange");
    			add_location(span10, file$6, 200, 14, 7112);
    			add_location(br0, file$6, 203, 16, 7218);
    			add_location(h50, file$6, 201, 14, 7168);
    			add_location(p4, file$6, 206, 14, 7294);
    			attr_dev(div35, "class", "xs-service-promo");
    			add_location(div35, file$6, 199, 12, 7066);
    			attr_dev(div36, "class", "col-md-6 col-lg-3");
    			add_location(div36, file$6, 198, 10, 7021);
    			attr_dev(span11, "class", "icon-groceries color-red");
    			add_location(span11, file$6, 215, 14, 7649);
    			add_location(br1, file$6, 218, 16, 7757);
    			add_location(h51, file$6, 216, 14, 7706);
    			add_location(p5, file$6, 221, 14, 7833);
    			attr_dev(div37, "class", "xs-service-promo");
    			add_location(div37, file$6, 214, 12, 7603);
    			attr_dev(div38, "class", "col-md-6 col-lg-3");
    			add_location(div38, file$6, 213, 10, 7558);
    			attr_dev(span12, "class", "icon-heartbeat color-purple");
    			add_location(span12, file$6, 230, 14, 8188);
    			add_location(br2, file$6, 233, 16, 8295);
    			add_location(h52, file$6, 231, 14, 8248);
    			add_location(p6, file$6, 236, 14, 8377);
    			attr_dev(div39, "class", "xs-service-promo");
    			add_location(div39, file$6, 229, 12, 8142);
    			attr_dev(div40, "class", "col-md-6 col-lg-3");
    			add_location(div40, file$6, 228, 10, 8097);
    			attr_dev(span13, "class", "icon-open-book color-green");
    			add_location(span13, file$6, 245, 14, 8732);
    			add_location(br3, file$6, 248, 16, 8845);
    			add_location(h53, file$6, 246, 14, 8791);
    			add_location(p7, file$6, 251, 14, 8924);
    			attr_dev(div41, "class", "xs-service-promo");
    			add_location(div41, file$6, 244, 12, 8686);
    			attr_dev(div42, "class", "col-md-6 col-lg-3");
    			add_location(div42, file$6, 243, 10, 8641);
    			attr_dev(div43, "class", "row");
    			add_location(div43, file$6, 197, 8, 6992);
    			attr_dev(div44, "class", "container");
    			add_location(div44, file$6, 183, 6, 6394);
    			attr_dev(section2, "class", "xs-section-padding");
    			add_location(section2, file$6, 182, 4, 6350);
    			attr_dev(main, "class", "xs-main");
    			add_location(main, file$6, 28, 2, 856);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div0);
    			append_dev(section0, t1);
    			append_dev(section0, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h20);
    			append_dev(div1, t3);
    			append_dev(div1, p0);
    			append_dev(div1, t5);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a0);
    			append_dev(li0, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, img);
    			append_dev(div4, t9);
    			append_dev(div4, div3);
    			append_dev(div3, a1);
    			append_dev(a1, i0);
    			append_dev(main, t10);
    			append_dev(main, section1);
    			append_dev(section1, div19);
    			append_dev(div19, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div9, h21);
    			append_dev(h21, t11);
    			append_dev(h21, span0);
    			append_dev(h21, t13);
    			append_dev(div19, t14);
    			append_dev(div19, div18);
    			append_dev(div18, div13);
    			append_dev(div13, div12);
    			append_dev(div12, h30);
    			append_dev(div12, t16);
    			append_dev(div12, p1);
    			append_dev(div18, t18);
    			append_dev(div18, div15);
    			append_dev(div15, div14);
    			append_dev(div14, h31);
    			append_dev(div14, t20);
    			append_dev(div14, p2);
    			append_dev(div18, t22);
    			append_dev(div18, div17);
    			append_dev(div17, div16);
    			append_dev(div16, h32);
    			append_dev(div16, t24);
    			append_dev(div16, ul1);
    			append_dev(ul1, li1);
    			append_dev(ul1, t26);
    			append_dev(ul1, li2);
    			append_dev(ul1, t28);
    			append_dev(ul1, li3);
    			append_dev(ul1, t30);
    			append_dev(ul1, li4);
    			append_dev(main, t32);
    			append_dev(main, div32);
    			append_dev(div32, div30);
    			append_dev(div30, div20);
    			append_dev(div20, h22);
    			append_dev(div30, t34);
    			append_dev(div30, div29);
    			append_dev(div29, div22);
    			append_dev(div22, div21);
    			append_dev(div21, i1);
    			append_dev(div21, t35);
    			append_dev(div21, span1);
    			append_dev(div21, t37);
    			append_dev(div21, span2);
    			append_dev(div21, t39);
    			append_dev(div21, small0);
    			append_dev(div29, t41);
    			append_dev(div29, div24);
    			append_dev(div24, div23);
    			append_dev(div23, i2);
    			append_dev(div23, t42);
    			append_dev(div23, span3);
    			append_dev(div23, t44);
    			append_dev(div23, span4);
    			append_dev(div23, t46);
    			append_dev(div23, small1);
    			append_dev(div29, t48);
    			append_dev(div29, div26);
    			append_dev(div26, div25);
    			append_dev(div25, i3);
    			append_dev(div25, t49);
    			append_dev(div25, span5);
    			append_dev(div25, t51);
    			append_dev(div25, span6);
    			append_dev(div25, t53);
    			append_dev(div25, small2);
    			append_dev(div29, t55);
    			append_dev(div29, div28);
    			append_dev(div28, div27);
    			append_dev(div27, i4);
    			append_dev(div27, t56);
    			append_dev(div27, span7);
    			append_dev(div27, t58);
    			append_dev(div27, span8);
    			append_dev(div27, t60);
    			append_dev(div27, small3);
    			append_dev(div32, t62);
    			append_dev(div32, div31);
    			append_dev(main, t63);
    			append_dev(main, section2);
    			append_dev(section2, div44);
    			append_dev(div44, div34);
    			append_dev(div34, div33);
    			append_dev(div33, h23);
    			append_dev(div33, t65);
    			append_dev(div33, span9);
    			append_dev(div33, t66);
    			append_dev(div33, p3);
    			append_dev(div44, t68);
    			append_dev(div44, div43);
    			append_dev(div43, div36);
    			append_dev(div36, div35);
    			append_dev(div35, span10);
    			append_dev(div35, t69);
    			append_dev(div35, h50);
    			append_dev(h50, t70);
    			append_dev(h50, br0);
    			append_dev(h50, t71);
    			append_dev(div35, t72);
    			append_dev(div35, p4);
    			append_dev(div43, t74);
    			append_dev(div43, div38);
    			append_dev(div38, div37);
    			append_dev(div37, span11);
    			append_dev(div37, t75);
    			append_dev(div37, h51);
    			append_dev(h51, t76);
    			append_dev(h51, br1);
    			append_dev(h51, t77);
    			append_dev(div37, t78);
    			append_dev(div37, p5);
    			append_dev(div43, t80);
    			append_dev(div43, div40);
    			append_dev(div40, div39);
    			append_dev(div39, span12);
    			append_dev(div39, t81);
    			append_dev(div39, h52);
    			append_dev(h52, t82);
    			append_dev(h52, br2);
    			append_dev(h52, t83);
    			append_dev(div39, t84);
    			append_dev(div39, p6);
    			append_dev(div43, t86);
    			append_dev(div43, div42);
    			append_dev(div42, div41);
    			append_dev(div41, span13);
    			append_dev(div41, t87);
    			append_dev(div41, h53);
    			append_dev(h53, t88);
    			append_dev(h53, br3);
    			append_dev(h53, t89);
    			append_dev(div41, t90);
    			append_dev(div41, p7);
    			insert_dev(target, t92, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(main);
    			if (detaching) detach_dev(t92);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Header, Footer });
    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    const mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: true,
        scaleControl: false,
        draggable: true,
        disableDefaultUI: true,

        // The latitude and longitude to center the map (always required)
        center: { lat: 40.67, lng: -73.94 }, // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                featureType: "administrative",
                elementType: "all",
                stylers: [{ saturation: "-100" }],
            },
            {
                featureType: "administrative.province",
                elementType: "all",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [
                    { saturation: -100 },
                    { lightness: 65 },
                    { visibility: "on" },
                ],
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [
                    { saturation: -100 },
                    { lightness: "50" },
                    { visibility: "simplified" },
                ],
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: "-100" }],
            },
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }],
            },
            {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{ lightness: "30" }],
            },
            {
                featureType: "road.local",
                elementType: "all",
                stylers: [{ lightness: "40" }],
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{ saturation: -100 }, { visibility: "simplified" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    { hue: "#ffff00" },
                    { lightness: -25 },
                    { saturation: -97 },
                ],
            },
            {
                featureType: "water",
                elementType: "labels",
                stylers: [{ lightness: -25 }, { saturation: -100 }],
            },
        ],
    };

    /* src\components\Map.svelte generated by Svelte v3.46.3 */
    const file$5 = "src\\components\\Map.svelte";

    function create_fragment$6(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			attr_dev(div0, "id", "xs-map");
    			attr_dev(div0, "class", "xs-box-shadow-2");
    			add_location(div0, file$5, 15, 4, 437);
    			attr_dev(div1, "class", "xs-maps-wraper map-wraper-v2");
    			add_location(div1, file$5, 14, 2, 389);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			/*div0_binding*/ ctx[1](div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			/*div0_binding*/ ctx[1](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Map', slots, []);
    	let container, map;

    	onMount(function () {
    		map = new google.maps.Map(container, mapOptions);

    		new google.maps.Marker({
    				position: new google.maps.LatLng(40.67, -73.94),
    				map,
    				title: "Snazzy!"
    			});
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Map> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(0, container);
    		});
    	}

    	$$self.$capture_state = () => ({ onMount, mapOptions, container, map });

    	$$self.$inject_state = $$props => {
    		if ('container' in $$props) $$invalidate(0, container = $$props.container);
    		if ('map' in $$props) map = $$props.map;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [container, div0_binding];
    }

    class Map$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Map",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\pages\Contact.svelte generated by Svelte v3.46.3 */
    const file$4 = "src\\pages\\Contact.svelte";

    // (105:14) {#if ready}
    function create_if_block$1(ctx) {
    	let map;
    	let current;
    	map = new Map$1({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(map.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(map, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(map.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(map.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(map, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(105:14) {#if ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let script;
    	let script_src_value;
    	let t0;
    	let header;
    	let t1;
    	let section0;
    	let div0;
    	let t2;
    	let div2;
    	let div1;
    	let h2;
    	let t4;
    	let p;
    	let t6;
    	let ul;
    	let li;
    	let a;
    	let t8;
    	let t9;
    	let main;
    	let section1;
    	let div17;
    	let div16;
    	let div15;
    	let div13;
    	let div12;
    	let h4;
    	let t11;
    	let form;
    	let div5;
    	let input0;
    	let t12;
    	let div4;
    	let div3;
    	let i0;
    	let t13;
    	let div8;
    	let input1;
    	let t14;
    	let div7;
    	let div6;
    	let i1;
    	let t15;
    	let div11;
    	let textarea;
    	let t16;
    	let div10;
    	let div9;
    	let i2;
    	let t17;
    	let button;
    	let t19;
    	let div14;
    	let t20;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	let if_block = /*ready*/ ctx[0] && create_if_block$1(ctx);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			script = element("script");
    			t0 = space();
    			create_component(header.$$.fragment);
    			t1 = space();
    			section0 = element("section");
    			div0 = element("div");
    			t2 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Contact Us";
    			t4 = space();
    			p = element("p");
    			p.textContent = "Give a helping hand for poor people";
    			t6 = space();
    			ul = element("ul");
    			li = element("li");
    			a = element("a");
    			a.textContent = "Home /";
    			t8 = text("\r\n            Contact");
    			t9 = space();
    			main = element("main");
    			section1 = element("section");
    			div17 = element("div");
    			div16 = element("div");
    			div15 = element("div");
    			div13 = element("div");
    			div12 = element("div");
    			h4 = element("h4");
    			h4.textContent = "Drop us a line";
    			t11 = space();
    			form = element("form");
    			div5 = element("div");
    			input0 = element("input");
    			t12 = space();
    			div4 = element("div");
    			div3 = element("div");
    			i0 = element("i");
    			t13 = space();
    			div8 = element("div");
    			input1 = element("input");
    			t14 = space();
    			div7 = element("div");
    			div6 = element("div");
    			i1 = element("i");
    			t15 = space();
    			div11 = element("div");
    			textarea = element("textarea");
    			t16 = space();
    			div10 = element("div");
    			div9 = element("div");
    			i2 = element("i");
    			t17 = space();
    			button = element("button");
    			button.textContent = "submit";
    			t19 = space();
    			div14 = element("div");
    			if (if_block) if_block.c();
    			t20 = space();
    			create_component(footer.$$.fragment);
    			script.defer = true;
    			script.async = true;
    			if (!src_url_equal(script.src, script_src_value = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCy7becgYuLwns3uumNm6WdBYkBpLfy44k&callback=initMap")) attr_dev(script, "src", script_src_value);
    			add_location(script, file$4, 8, 4, 230);
    			attr_dev(div0, "class", "xs-black-overlay");
    			add_location(div0, file$4, 21, 4, 626);
    			add_location(h2, file$4, 24, 8, 754);
    			add_location(p, file$4, 25, 8, 783);
    			attr_dev(a, "href", "index.html");
    			attr_dev(a, "class", "color-white");
    			add_location(a, file$4, 28, 12, 929);
    			attr_dev(li, "class", "badge badge-pill badge-primary");
    			add_location(li, file$4, 27, 10, 872);
    			attr_dev(ul, "class", "xs-breadcumb");
    			add_location(ul, file$4, 26, 8, 835);
    			attr_dev(div1, "class", "color-white xs-inner-banner-content");
    			add_location(div1, file$4, 23, 6, 695);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$4, 22, 4, 664);
    			attr_dev(section0, "class", "xs-banner-inner-section parallax-window");
    			set_style(section0, "background-image", "url('assets/images/contact_bg.png')");
    			add_location(section0, file$4, 18, 2, 492);
    			add_location(h4, file$4, 46, 16, 1449);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "name");
    			attr_dev(input0, "id", "xs-name");
    			attr_dev(input0, "class", "form-control");
    			attr_dev(input0, "placeholder", "Enter Your Name.....");
    			add_location(input0, file$4, 53, 20, 1725);
    			attr_dev(i0, "class", "fa fa-user");
    			add_location(i0, file$4, 61, 24, 2076);
    			attr_dev(div3, "class", "input-group-text");
    			add_location(div3, file$4, 60, 22, 2020);
    			attr_dev(div4, "class", "input-group-append");
    			add_location(div4, file$4, 59, 20, 1964);
    			attr_dev(div5, "class", "input-group");
    			add_location(div5, file$4, 52, 18, 1678);
    			attr_dev(input1, "type", "email");
    			attr_dev(input1, "name", "email");
    			attr_dev(input1, "id", "xs-email");
    			attr_dev(input1, "class", "form-control");
    			attr_dev(input1, "placeholder", "Enter Your Email.....");
    			add_location(input1, file$4, 67, 20, 2296);
    			attr_dev(i1, "class", "fa fa-envelope-o");
    			add_location(i1, file$4, 75, 24, 2651);
    			attr_dev(div6, "class", "input-group-text");
    			add_location(div6, file$4, 74, 22, 2595);
    			attr_dev(div7, "class", "input-group-append");
    			add_location(div7, file$4, 73, 20, 2539);
    			attr_dev(div8, "class", "input-group");
    			add_location(div8, file$4, 66, 18, 2249);
    			attr_dev(textarea, "name", "massage");
    			attr_dev(textarea, "placeholder", "Enter Your Message.....");
    			attr_dev(textarea, "id", "xs-massage");
    			attr_dev(textarea, "class", "form-control");
    			attr_dev(textarea, "cols", "30");
    			attr_dev(textarea, "rows", "10");
    			add_location(textarea, file$4, 81, 20, 2891);
    			attr_dev(i2, "class", "fa fa-pencil");
    			add_location(i2, file$4, 90, 24, 3285);
    			attr_dev(div9, "class", "input-group-text");
    			add_location(div9, file$4, 89, 22, 3229);
    			attr_dev(div10, "class", "input-group-append");
    			add_location(div10, file$4, 88, 20, 3173);
    			attr_dev(div11, "class", "input-group massage-group");
    			add_location(div11, file$4, 80, 18, 2830);
    			attr_dev(button, "class", "btn btn-success");
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "id", "xs-submit");
    			add_location(button, file$4, 95, 18, 3460);
    			attr_dev(form, "action", "#");
    			attr_dev(form, "method", "POST");
    			attr_dev(form, "id", "xs-contact-form");
    			attr_dev(form, "class", "xs-contact-form contact-form-v2");
    			add_location(form, file$4, 47, 16, 1490);
    			attr_dev(div12, "class", "xs-contact-form-wraper");
    			add_location(div12, file$4, 45, 14, 1395);
    			attr_dev(div13, "class", "col-lg-6");
    			add_location(div13, file$4, 44, 12, 1357);
    			attr_dev(div14, "class", "col-lg-6");
    			add_location(div14, file$4, 103, 12, 3775);
    			attr_dev(div15, "class", "row");
    			add_location(div15, file$4, 43, 10, 1326);
    			attr_dev(div16, "class", "xs-contact-container");
    			add_location(div16, file$4, 42, 8, 1280);
    			attr_dev(div17, "class", "container");
    			add_location(div17, file$4, 41, 6, 1247);
    			attr_dev(section1, "class", "xs-contact-section-v2");
    			add_location(section1, file$4, 40, 4, 1200);
    			attr_dev(main, "class", "xs-main");
    			add_location(main, file$4, 38, 2, 1142);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, script);
    			insert_dev(target, t0, anchor);
    			mount_component(header, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div0);
    			append_dev(section0, t2);
    			append_dev(section0, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(div1, t4);
    			append_dev(div1, p);
    			append_dev(div1, t6);
    			append_dev(div1, ul);
    			append_dev(ul, li);
    			append_dev(li, a);
    			append_dev(li, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, section1);
    			append_dev(section1, div17);
    			append_dev(div17, div16);
    			append_dev(div16, div15);
    			append_dev(div15, div13);
    			append_dev(div13, div12);
    			append_dev(div12, h4);
    			append_dev(div12, t11);
    			append_dev(div12, form);
    			append_dev(form, div5);
    			append_dev(div5, input0);
    			append_dev(div5, t12);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, i0);
    			append_dev(form, t13);
    			append_dev(form, div8);
    			append_dev(div8, input1);
    			append_dev(div8, t14);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, i1);
    			append_dev(form, t15);
    			append_dev(form, div11);
    			append_dev(div11, textarea);
    			append_dev(div11, t16);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div9, i2);
    			append_dev(form, t17);
    			append_dev(form, button);
    			append_dev(div15, t19);
    			append_dev(div15, div14);
    			if (if_block) if_block.m(div14, null);
    			insert_dev(target, t20, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*ready*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div14, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(script);
    			if (detaching) detach_dev(t0);
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t20);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	let { ready } = $$props;
    	const writable_props = ['ready'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('ready' in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	$$self.$capture_state = () => ({ Header, Footer, Map: Map$1, ready });

    	$$self.$inject_state = $$props => {
    		if ('ready' in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ready];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { ready: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ready*/ ctx[0] === undefined && !('ready' in props)) {
    			console.warn("<Contact> was created without expected prop 'ready'");
    		}
    	}

    	get ready() {
    		throw new Error("<Contact>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ready(value) {
    		throw new Error("<Contact>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Donation.svelte generated by Svelte v3.46.3 */

    const { console: console_1 } = globals;
    const file$3 = "src\\pages\\Donation.svelte";

    // (78:2) {:else}
    function create_else_block(ctx) {
    	let section0;
    	let div0;
    	let t0;
    	let div2;
    	let div1;
    	let h20;
    	let t2;
    	let p0;
    	let t3_value = /*$charity*/ ctx[1].title + "";
    	let t3;
    	let t4;
    	let ul;
    	let li;
    	let a;
    	let t6;
    	let t7;
    	let main;
    	let section1;
    	let div13;
    	let div12;
    	let div4;
    	let div3;
    	let img;
    	let img_src_value;
    	let t8;
    	let div11;
    	let div10;
    	let div5;
    	let h21;
    	let t9_value = /*$charity*/ ctx[1].title + "";
    	let t9;
    	let t10;
    	let p1;
    	let t11;
    	let span0;
    	let t13;
    	let span1;
    	let t15;
    	let t16;
    	let h5;
    	let t17;
    	let strong;
    	let t18;
    	let t19;
    	let t20;
    	let t21;
    	let span2;
    	let t22;
    	let form;
    	let div6;
    	let label0;
    	let t23;
    	let span3;
    	let t25;
    	let input0;
    	let t26;
    	let div7;
    	let label1;
    	let t27;
    	let span4;
    	let t29;
    	let input1;
    	let t30;
    	let div8;
    	let label2;
    	let t31;
    	let span5;
    	let t33;
    	let input2;
    	let t34;
    	let div9;
    	let input3;
    	let t35;
    	let label3;
    	let t36;
    	let span6;
    	let t38;
    	let button;
    	let span7;
    	let i;
    	let t39;
    	let button_disabled_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section0 = element("section");
    			div0 = element("div");
    			t0 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h20 = element("h2");
    			h20.textContent = "Donate Now";
    			t2 = space();
    			p0 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			ul = element("ul");
    			li = element("li");
    			a = element("a");
    			a.textContent = "Home /";
    			t6 = text("\r\n              Donate");
    			t7 = space();
    			main = element("main");
    			section1 = element("section");
    			div13 = element("div");
    			div12 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t8 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div5 = element("div");
    			h21 = element("h2");
    			t9 = text(t9_value);
    			t10 = space();
    			p1 = element("p");
    			t11 = text("To learn more about make donate charity with us visit our \"\r\n                    ");
    			span0 = element("span");
    			span0.textContent = "Contact us";
    			t13 = text("\r\n                    \" site. By calling\r\n                    ");
    			span1 = element("span");
    			span1.textContent = "+44(0) 800 883 8450";
    			t15 = text("\r\n                    .");
    			t16 = space();
    			h5 = element("h5");
    			t17 = text("Your donation will be contributing\r\n                    ");
    			strong = element("strong");
    			t18 = text(/*contribute*/ ctx[5]);
    			t19 = text("%");
    			t20 = text("\r\n                    of total current donation.");
    			t21 = space();
    			span2 = element("span");
    			t22 = space();
    			form = element("form");
    			div6 = element("div");
    			label0 = element("label");
    			t23 = text("Donation Amount\r\n                      ");
    			span3 = element("span");
    			span3.textContent = "**";
    			t25 = space();
    			input0 = element("input");
    			t26 = space();
    			div7 = element("div");
    			label1 = element("label");
    			t27 = text("Your Name\r\n                      ");
    			span4 = element("span");
    			span4.textContent = "**";
    			t29 = space();
    			input1 = element("input");
    			t30 = space();
    			div8 = element("div");
    			label2 = element("label");
    			t31 = text("Your Email\r\n                      ");
    			span5 = element("span");
    			span5.textContent = "**";
    			t33 = space();
    			input2 = element("input");
    			t34 = space();
    			div9 = element("div");
    			input3 = element("input");
    			t35 = space();
    			label3 = element("label");
    			t36 = text("I Agree\r\n                      ");
    			span6 = element("span");
    			span6.textContent = "**";
    			t38 = space();
    			button = element("button");
    			span7 = element("span");
    			i = element("i");
    			t39 = text("\r\n                    Donate now");
    			attr_dev(div0, "class", "xs-black-overlay");
    			add_location(div0, file$3, 81, 6, 2308);
    			add_location(h20, file$3, 84, 10, 2442);
    			add_location(p0, file$3, 85, 10, 2473);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "class", "color-white");
    			add_location(a, file$3, 88, 14, 2606);
    			attr_dev(li, "class", "badge badge-pill badge-primary");
    			add_location(li, file$3, 87, 12, 2547);
    			attr_dev(ul, "class", "xs-breadcumb");
    			add_location(ul, file$3, 86, 10, 2508);
    			attr_dev(div1, "class", "color-white xs-inner-banner-content");
    			add_location(div1, file$3, 83, 8, 2381);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$3, 82, 6, 2348);
    			attr_dev(section0, "class", "xs-banner-inner-section parallax-window");
    			set_style(section0, "background-image", "url('/assets/images/backgrounds/kat-yukawa-K0E6E0a0R3A-unsplash.jpg')");
    			add_location(section0, file$3, 78, 4, 2134);
    			if (!src_url_equal(img.src, img_src_value = /*$charity*/ ctx[1].thumbnail)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "img-responsive");
    			attr_dev(img, "alt", "Family Images");
    			add_location(img, file$3, 104, 16, 3104);
    			attr_dev(div3, "class", "xs-donation-form-images svelte-1byes5c");
    			add_location(div3, file$3, 103, 14, 3049);
    			attr_dev(div4, "class", "col-lg-6");
    			add_location(div4, file$3, 102, 12, 3011);
    			attr_dev(h21, "class", "xs-title");
    			add_location(h21, file$3, 113, 18, 3438);
    			attr_dev(span0, "class", "color-green");
    			add_location(span0, file$3, 116, 20, 3620);
    			attr_dev(span1, "class", "color-green");
    			add_location(span1, file$3, 118, 20, 3725);
    			attr_dev(p1, "class", "small");
    			add_location(p1, file$3, 114, 18, 3500);
    			add_location(strong, file$3, 123, 20, 3926);
    			add_location(h5, file$3, 121, 18, 3844);
    			attr_dev(span2, "class", "xs-separetor v2");
    			add_location(span2, file$3, 126, 18, 4049);
    			attr_dev(div5, "class", "xs-heading xs-mb-30");
    			add_location(div5, file$3, 112, 16, 3385);
    			attr_dev(span3, "class", "color-light-red");
    			add_location(span3, file$3, 139, 22, 4580);
    			attr_dev(label0, "for", "xs-donate-name");
    			add_location(label0, file$3, 137, 20, 4489);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "name", "amount");
    			attr_dev(input0, "id", "xs-donate-amount");
    			attr_dev(input0, "class", "form-control");
    			input0.required = "true";
    			attr_dev(input0, "placeholder", "Your donation in Rupiah");
    			add_location(input0, file$3, 141, 20, 4671);
    			attr_dev(div6, "class", "xs-input-group");
    			add_location(div6, file$3, 136, 18, 4439);
    			attr_dev(span4, "class", "color-light-red");
    			add_location(span4, file$3, 154, 22, 5213);
    			attr_dev(label1, "for", "xs-donate-name");
    			add_location(label1, file$3, 152, 20, 5128);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "name", "name");
    			attr_dev(input1, "id", "xs-donate-name");
    			attr_dev(input1, "class", "form-control");
    			input1.required = "true";
    			attr_dev(input1, "placeholder", "Your awesome name");
    			add_location(input1, file$3, 156, 20, 5304);
    			attr_dev(div7, "class", "xs-input-group");
    			add_location(div7, file$3, 151, 18, 5078);
    			attr_dev(span5, "class", "color-light-red");
    			add_location(span5, file$3, 168, 22, 5788);
    			attr_dev(label2, "for", "xs-donate-email");
    			add_location(label2, file$3, 166, 20, 5701);
    			attr_dev(input2, "type", "email");
    			attr_dev(input2, "name", "email");
    			input2.required = "true";
    			attr_dev(input2, "id", "xs-donate-email");
    			attr_dev(input2, "class", "form-control");
    			attr_dev(input2, "placeholder", "email@awesome.com");
    			add_location(input2, file$3, 170, 20, 5879);
    			attr_dev(div8, "class", "xs-input-group");
    			add_location(div8, file$3, 165, 18, 5651);
    			attr_dev(input3, "type", "checkbox");
    			attr_dev(input3, "name", "agree");
    			attr_dev(input3, "id", "xs-donate-agree");
    			attr_dev(input3, "class", "svelte-1byes5c");
    			add_location(input3, file$3, 180, 20, 6303);
    			attr_dev(span6, "class", "color-light-red");
    			add_location(span6, file$3, 187, 22, 6581);
    			attr_dev(label3, "for", "xs-donate-agree");
    			attr_dev(label3, "class", "svelte-1byes5c");
    			add_location(label3, file$3, 185, 20, 6497);
    			attr_dev(div9, "class", "xs-input-group svelte-1byes5c");
    			attr_dev(div9, "id", "xs-input-checkbox");
    			add_location(div9, file$3, 179, 18, 6230);
    			attr_dev(i, "class", "fa fa-heart");
    			add_location(i, file$3, 193, 22, 6874);
    			attr_dev(span7, "class", "badge");
    			add_location(span7, file$3, 192, 20, 6830);
    			attr_dev(button, "type", "submit");
    			button.disabled = button_disabled_value = !/*agree*/ ctx[4];
    			attr_dev(button, "class", "btn btn-warning");
    			add_location(button, file$3, 191, 18, 6744);
    			attr_dev(form, "action", "#");
    			attr_dev(form, "method", "post");
    			attr_dev(form, "id", "xs-donation-form");
    			attr_dev(form, "class", "xs-donation-form");
    			attr_dev(form, "name", "xs-donation-form");
    			add_location(form, file$3, 129, 16, 4165);
    			attr_dev(div10, "class", "xs-donation-form-wraper");
    			add_location(div10, file$3, 111, 14, 3330);
    			attr_dev(div11, "class", "col-lg-6");
    			add_location(div11, file$3, 110, 12, 3292);
    			attr_dev(div12, "class", "row");
    			add_location(div12, file$3, 101, 10, 2980);
    			attr_dev(div13, "class", "container");
    			add_location(div13, file$3, 100, 8, 2945);
    			attr_dev(section1, "class", "xs-section-padding bg-gray");
    			add_location(section1, file$3, 99, 6, 2891);
    			attr_dev(main, "class", "xs-main");
    			add_location(main, file$3, 97, 4, 2823);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section0, anchor);
    			append_dev(section0, div0);
    			append_dev(section0, t0);
    			append_dev(section0, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h20);
    			append_dev(div1, t2);
    			append_dev(div1, p0);
    			append_dev(p0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, ul);
    			append_dev(ul, li);
    			append_dev(li, a);
    			append_dev(li, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, section1);
    			append_dev(section1, div13);
    			append_dev(div13, div12);
    			append_dev(div12, div4);
    			append_dev(div4, div3);
    			append_dev(div3, img);
    			append_dev(div12, t8);
    			append_dev(div12, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div5);
    			append_dev(div5, h21);
    			append_dev(h21, t9);
    			append_dev(div5, t10);
    			append_dev(div5, p1);
    			append_dev(p1, t11);
    			append_dev(p1, span0);
    			append_dev(p1, t13);
    			append_dev(p1, span1);
    			append_dev(p1, t15);
    			append_dev(div5, t16);
    			append_dev(div5, h5);
    			append_dev(h5, t17);
    			append_dev(h5, strong);
    			append_dev(strong, t18);
    			append_dev(strong, t19);
    			append_dev(h5, t20);
    			append_dev(div5, t21);
    			append_dev(div5, span2);
    			append_dev(div10, t22);
    			append_dev(div10, form);
    			append_dev(form, div6);
    			append_dev(div6, label0);
    			append_dev(label0, t23);
    			append_dev(label0, span3);
    			append_dev(div6, t25);
    			append_dev(div6, input0);
    			set_input_value(input0, /*amount*/ ctx[0]);
    			append_dev(form, t26);
    			append_dev(form, div7);
    			append_dev(div7, label1);
    			append_dev(label1, t27);
    			append_dev(label1, span4);
    			append_dev(div7, t29);
    			append_dev(div7, input1);
    			set_input_value(input1, /*name*/ ctx[2]);
    			append_dev(form, t30);
    			append_dev(form, div8);
    			append_dev(div8, label2);
    			append_dev(label2, t31);
    			append_dev(label2, span5);
    			append_dev(div8, t33);
    			append_dev(div8, input2);
    			set_input_value(input2, /*email*/ ctx[3]);
    			append_dev(form, t34);
    			append_dev(form, div9);
    			append_dev(div9, input3);
    			input3.checked = /*agree*/ ctx[4];
    			append_dev(div9, t35);
    			append_dev(div9, label3);
    			append_dev(label3, t36);
    			append_dev(label3, span6);
    			append_dev(form, t38);
    			append_dev(form, button);
    			append_dev(button, span7);
    			append_dev(span7, i);
    			append_dev(button, t39);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[9]),
    					listen_dev(input3, "change", /*input3_change_handler*/ ctx[10]),
    					listen_dev(form, "submit", prevent_default(/*handleForm*/ ctx[6]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$charity*/ 2 && t3_value !== (t3_value = /*$charity*/ ctx[1].title + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*$charity*/ 2 && !src_url_equal(img.src, img_src_value = /*$charity*/ ctx[1].thumbnail)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*$charity*/ 2 && t9_value !== (t9_value = /*$charity*/ ctx[1].title + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*contribute*/ 32) set_data_dev(t18, /*contribute*/ ctx[5]);

    			if (dirty & /*amount*/ 1 && input0.value !== /*amount*/ ctx[0]) {
    				set_input_value(input0, /*amount*/ ctx[0]);
    			}

    			if (dirty & /*name*/ 4 && input1.value !== /*name*/ ctx[2]) {
    				set_input_value(input1, /*name*/ ctx[2]);
    			}

    			if (dirty & /*email*/ 8 && input2.value !== /*email*/ ctx[3]) {
    				set_input_value(input2, /*email*/ ctx[3]);
    			}

    			if (dirty & /*agree*/ 16) {
    				input3.checked = /*agree*/ ctx[4];
    			}

    			if (dirty & /*agree*/ 16 && button_disabled_value !== (button_disabled_value = !/*agree*/ ctx[4])) {
    				prop_dev(button, "disabled", button_disabled_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(main);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(78:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (76:2) {#if !$charity}
    function create_if_block(ctx) {
    	let loader;
    	let current;
    	loader = new Loader({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(loader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(loader, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(loader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(76:2) {#if !$charity}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let header;
    	let t0;
    	let current_block_type_index;
    	let if_block;
    	let t1;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*$charity*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			if_block.c();
    			t1 = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(t1.parentNode, t1);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleButtonClick() {
    	console.log("Button click");
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $params;
    	let $charity;
    	validate_store(params, 'params');
    	component_subscribe($$self, params, $$value => $$invalidate(11, $params = $$value));
    	validate_store(charity, 'charity');
    	component_subscribe($$self, charity, $$value => $$invalidate(1, $charity = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Donation', slots, []);
    	let amount = 0, name, email, agree = false, contribute = 0;
    	getCharity($params.id);

    	async function handleForm(event) {
    		$$invalidate(4, agree = false);
    		const newData = await getCharity($params.id);
    		newData.pledged = newData.pledged + parseInt(amount);

    		try {
    			const res = await fetch(`https://charity-api-bwa.herokuapp.com/charities/${$params.id}`, {
    				method: "PUT",
    				headers: { "content-type": "application/json" },
    				body: JSON.stringify(newData)
    			});

    			const resMid = await fetch(`/.netlify/functions/payment`, {
    				method: "POST",
    				headers: { "content-type": "application/json" },
    				body: JSON.stringify({
    					id: $params.id,
    					amount: parseInt(amount),
    					name,
    					email
    				})
    			});

    			const midtransData = await resMid.json();
    			console.log(midtransData);
    			window.location.href = midtransData.url;
    		} catch(err) {
    			console.log(err);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Donation> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		amount = this.value;
    		$$invalidate(0, amount);
    	}

    	function input1_input_handler() {
    		name = this.value;
    		$$invalidate(2, name);
    	}

    	function input2_input_handler() {
    		email = this.value;
    		$$invalidate(3, email);
    	}

    	function input3_change_handler() {
    		agree = this.checked;
    		$$invalidate(4, agree);
    	}

    	$$self.$capture_state = () => ({
    		charity,
    		getCharity,
    		params,
    		router: router__default["default"],
    		Header,
    		Footer,
    		Loader,
    		amount,
    		name,
    		email,
    		agree,
    		contribute,
    		handleButtonClick,
    		handleForm,
    		$params,
    		$charity
    	});

    	$$self.$inject_state = $$props => {
    		if ('amount' in $$props) $$invalidate(0, amount = $$props.amount);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('email' in $$props) $$invalidate(3, email = $$props.email);
    		if ('agree' in $$props) $$invalidate(4, agree = $$props.agree);
    		if ('contribute' in $$props) $$invalidate(5, contribute = $$props.contribute);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$charity, amount*/ 3) {
    			if ($charity) {
    				$$invalidate(5, contribute = Math.floor(parseInt(amount) / $charity.target * 100));
    			}
    		}
    	};

    	return [
    		amount,
    		$charity,
    		name,
    		email,
    		agree,
    		contribute,
    		handleForm,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_change_handler
    	];
    }

    class Donation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Donation",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\pages\NotFound.svelte generated by Svelte v3.46.3 */

    const file$2 = "src\\pages\\NotFound.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let p;
    	let t4;
    	let a;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "Oops!";
    			t2 = space();
    			p = element("p");
    			p.textContent = "There is something wrong with the page. I cannot find it.";
    			t4 = space();
    			a = element("a");
    			a.textContent = "Back to the home page";
    			if (!src_url_equal(img.src, img_src_value = "/assets/images/page-not-found.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "width", "450");
    			attr_dev(img, "height", "450");
    			add_location(img, file$2, 5, 10, 241);
    			attr_dev(h2, "class", "xs-title");
    			add_location(h2, file$2, 10, 10, 384);
    			add_location(p, file$2, 11, 10, 427);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "class", "btn btn-primary mt-4");
    			add_location(a, file$2, 12, 10, 503);
    			attr_dev(div0, "class", "col-md-6 col-xl-6");
    			add_location(div0, file$2, 4, 8, 198);
    			attr_dev(div1, "class", "xs-heading row xs-mb-60 justify-content-center text-center");
    			add_location(div1, file$2, 3, 6, 116);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$2, 2, 4, 85);
    			attr_dev(section, "class", "waypoint-tigger xs-section-padding");
    			add_location(section, file$2, 1, 0, 27);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, h2);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(div0, t4);
    			append_dev(div0, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NotFound', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NotFound> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class NotFound extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotFound",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\pages\Success.svelte generated by Svelte v3.46.3 */

    const file$1 = "src\\pages\\Success.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let p;
    	let t4;
    	let a;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "Wow! You Are So Kind";
    			t2 = space();
    			p = element("p");
    			p.textContent = "Your donation has been successfully transferred into their account and\r\n            we will send the details to your email.";
    			t4 = space();
    			a = element("a");
    			a.textContent = "Back to Home";
    			if (!src_url_equal(img.src, img_src_value = "/assets/images/success_donation.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "width", "450");
    			attr_dev(img, "height", "450");
    			add_location(img, file$1, 4, 10, 232);
    			attr_dev(h2, "class", "xs-title");
    			add_location(h2, file$1, 9, 10, 377);
    			add_location(p, file$1, 10, 10, 435);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "class", "btn btn-primary mt-4");
    			add_location(a, file$1, 14, 10, 603);
    			attr_dev(div0, "class", "col-md-6 col-xl-6");
    			add_location(div0, file$1, 3, 8, 189);
    			attr_dev(div1, "class", "xs-heading row xs-mb-60 justify-content-center text-center");
    			add_location(div1, file$1, 2, 6, 107);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$1, 1, 4, 76);
    			attr_dev(section, "id", "popularcause");
    			attr_dev(section, "class", "waypoint-tigger xs-section-padding");
    			add_location(section, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, h2);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(div0, t4);
    			append_dev(div0, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Success', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Success> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Success extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Success",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\pages\Failure.svelte generated by Svelte v3.46.3 */

    const file = "src\\pages\\Failure.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let div2;
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let p;
    	let t4;
    	let a;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "Oops!";
    			t2 = space();
    			p = element("p");
    			p.textContent = "There is something wrong with the payment please try again or cancel\r\n            the donation.";
    			t4 = space();
    			a = element("a");
    			a.textContent = "Try Again";
    			if (!src_url_equal(img.src, img_src_value = "/assets/images/donation_error.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "width", "450");
    			attr_dev(img, "height", "450");
    			add_location(img, file, 4, 10, 232);
    			attr_dev(h2, "class", "xs-title");
    			add_location(h2, file, 9, 10, 375);
    			add_location(p, file, 10, 10, 418);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "class", "btn btn-primary mt-4");
    			add_location(a, file, 14, 10, 558);
    			attr_dev(div0, "class", "col-md-6 col-xl-6");
    			add_location(div0, file, 3, 8, 189);
    			attr_dev(div1, "class", "xs-heading row xs-mb-60 justify-content-center text-center");
    			add_location(div1, file, 2, 6, 107);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file, 1, 4, 76);
    			attr_dev(section, "id", "popularcause");
    			attr_dev(section, "class", "waypoint-tigger xs-section-padding");
    			add_location(section, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, h2);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(div0, t4);
    			append_dev(div0, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Failure', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Failure> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Failure extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Failure",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.3 */

    function create_fragment(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*$page*/ ctx[1];

    	function switch_props(ctx) {
    		return {
    			props: { ready: /*ready*/ ctx[0] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = {};
    			if (dirty & /*ready*/ 1) switch_instance_changes.ready = /*ready*/ ctx[0];

    			if (switch_value !== (switch_value = /*$page*/ ctx[1])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $page;
    	let $params;
    	validate_store(page, 'page');
    	component_subscribe($$self, page, $$value => $$invalidate(1, $page = $$value));
    	validate_store(params, 'params');
    	component_subscribe($$self, params, $$value => $$invalidate(2, $params = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { ready } = $$props;
    	router__default["default"]("/", () => set_store_value(page, $page = Home, $page));
    	router__default["default"]("/about", () => set_store_value(page, $page = About, $page));
    	router__default["default"]("/contact", () => set_store_value(page, $page = Contact, $page));
    	router__default["default"]("/success", () => set_store_value(page, $page = Success, $page));
    	router__default["default"]("/error", () => set_store_value(page, $page = Failure, $page));

    	router__default["default"](
    		"/donation/:id",
    		(ctx, next) => {
    			set_store_value(params, $params = ctx.params, $params);
    			next();
    		},
    		() => set_store_value(page, $page = Donation, $page)
    	);

    	router__default["default"]("/*", () => set_store_value(page, $page = NotFound, $page));
    	router__default["default"].start();
    	const writable_props = ['ready'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('ready' in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	$$self.$capture_state = () => ({
    		router: router__default["default"],
    		page,
    		params,
    		Home,
    		About,
    		Contact,
    		Donation,
    		NotFound,
    		Success,
    		Failure,
    		ready,
    		$page,
    		$params
    	});

    	$$self.$inject_state = $$props => {
    		if ('ready' in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ready, $page];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { ready: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ready*/ ctx[0] === undefined && !('ready' in props)) {
    			console.warn("<App> was created without expected prop 'ready'");
    		}
    	}

    	get ready() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ready(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.querySelector("#root"),
    	props: {
    		ready: false
    	}
    });

    window.initMap = function () {
    	app.$set({ ready: true });
    };

    return app;

})(router);
//# sourceMappingURL=bundle.js.map
