# Tennis Animation Studies

![Animated tennis point replay](images/rally_demo_AO.gif)

- **What:** Turn coordinate-level shot and point data into animated court replays and tactical visuals.
- **Why:** Make spacing, movement, and point construction understandable at a glance—the foundation for becoming the **3Blue1Brown of tennis**.

The repository also contains visual studies for serve placement, return position, winners, errors, and match summaries.

## Open the charts locally

Run `python3 -m http.server 8000` from this directory, then open a chart under
`http://localhost:8000/visuals/standardized/`. Serve the repository root so the
charts can load their committed JSON from `data/json/`; opening the files directly
can block browser data requests. D3 and fonts load from external providers.

Run `node --test tests/visual-paths.test.cjs` to check the standardized chart data paths.
